from bs4 import BeautifulSoup
import fiona
import geojson
import geopandas as gpd
import json
import numpy as np
import pandas as pd
import requests
import topojson as tp

gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'

r = requests.get('https://geoservicios.cultura.gob.pe/geoserver/interoperabilidad/wms?service=WMS&version=1.1.0&request=GetMap&layers=interoperabilidad:cultura_museos&srs=EPSG%3A3857&width=1920&height=901&bbox=-10652264.261822164,-2404403.1617385033,-5955973.243980935,-200570.7622203025&format=kml')

f =  fiona.BytesCollection(bytes(r.content))

df = gpd.GeoDataFrame()

for layer in fiona.listlayers(f.path):
    s = gpd.read_file(f.path, driver='KML', layer=layer)
    df = df.append(s, ignore_index=True)

df["id"] = df.index + 1
df["nombre"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[1].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 1 else False, axis=1)
df["direccion"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[3].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 3 else False, axis=1)
df["telefono"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[5].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 5 else False, axis=1)
df["administracion"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[7].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 7 else False, axis=1)
df["latitude"] = df["geometry"].x
df["longitude"] = df["geometry"].y

df = df[["id", "nombre", "direccion", "telefono", "administracion", "latitude", "longitude", "geometry"]].copy()

topo = tp.Topology(df, topology=True)

topo.to_json("../static/topojson/museos.json")

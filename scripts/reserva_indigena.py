from bs4 import BeautifulSoup
import fiona
import geojson
import geopandas as gpd
import json
import numpy as np
import os
import pandas as pd
import shapely
import requests
import topojson as tp

gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'

r = requests.get('https://geoservicios.cultura.gob.pe/geoserver/interoperabilidad/wms?service=WMS&version=1.1.0&request=GetMap&layers=interoperabilidad:cultura_reserva_indigena&srs=EPSG%3A3857&width=1920&height=901&bbox=-10652264.261822164,-2404403.1617385033,-5955973.243980935,-200570.7622203025&format=kml')

f =  fiona.BytesCollection(bytes(r.content))

df = gpd.GeoDataFrame()

for layer in fiona.listlayers(f.path):
    s = gpd.read_file(f.path, driver='KML', layer=layer)
    df = df.append(s, ignore_index=True)

df["id"] = df.index + 1
df["nombre"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[1].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 1 else False, axis=1)
df["categoria"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[3].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 3 else False, axis=1)
df["estado"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[5].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 5 else False, axis=1)
df["pueblo_indigena"] = df.apply(lambda x: BeautifulSoup(x["Description"], 'html.parser').findAll('span')[7].get_text(strip=True) if len(BeautifulSoup(x["Description"], 'html.parser').findAll('span')) >= 7 else False, axis=1)

df = df[["id", "nombre", "categoria", "estado", "pueblo_indigena", "geometry"]].copy()

df["geometry"] = df.apply(lambda x: x["geometry"][1], axis=1)

df["geometry"] = df["geometry"].simplify(0.01, preserve_topology=True)

df.to_file('../static/topojson/reserva_indigena_.json', driver='GeoJSON')

temp = gpd.read_file('../static/topojson/reserva_indigena_.json')

topo = tp.Topology(temp.to_json())

topojson_ = json.loads(topo.to_json())

for i in range(0, len(topojson_["objects"]["data"]["geometries"])):
    if topojson_["objects"]["data"]["geometries"][i]["type"] == "GeometryCollection":
        _item = {}
        _item["type"] = "MultiPolygon"
        _item["id"] = topojson_["objects"]["data"]["geometries"][i]["id"]
        _item["properties"] = topojson_["objects"]["data"]["geometries"][i]["properties"]
        _item["arcs"] = []

        for geometry in topojson_["objects"]["data"]["geometries"][i]["geometries"]:
            for arc in geometry["geometries"]:
                _item["arcs"].append(arc["arcs"])

        topojson_["objects"]["data"]["geometries"][i] = {
            "type": _item["type"],
            "id": _item["id"],
            "properties": _item["properties"],
            "arcs": _item["arcs"]
        }

with open('../static/topojson/reserva_indigena.json', 'w') as outfile:
    json.dump(json.loads(json.dumps(topojson_)), outfile)

const {merge} = require("d3-array");
const sequelize = require("sequelize");

module.exports = function(app) {

  const {db} = app.settings;

  app.get("/api/home", async(req, res) => {
    const language = "es";

    const tiles = [
      {
        link: "/profile/cite/citemadera-lima"
      },
      {
        link: "/profile/cite/citeacuicola-ahuashiyacu"
      },
      {
        link: "/profile/industry/elaboracion-de-productos-alimenticios"
      },
      {
        link: "/profile/industry/fabricacion-de-otros-productos-minerales-no-metalicos"
      },
      {
        link: "/profile/cite/citeforestal-pucallpa"
      },
      {
        link: "/profile/industry/fabricacion-de-productos-textiles"
      }

      /*
      {
        link: "/profile/cite/utagroindustrial-ambo"
      },
      {
        link: "/profile/industry/industrias-manufactureras"
      },
      {
        link: "/profile/industry/agricultura-ganaderia-silvicultura-y-pesca"
      },
      {
        link: "/profile/cite/citetextil-camelidos-arequipa"
      },
      {
        link: "/profile/cite/citepesquero-callao"
      },
      {
        link: "/profile/cite/citeccal-lima"
      },
      {
        link: "/profile/industry/comercio-al-por-mayor-y-al-por-menor-reparacion-de-vehiculos-automotores-y-motocicletas"
      },
      {
        link: "/profile/industry/construccion"
      }, */
    ];

    let tileData = tiles
      .map(d => typeof d === "string" ? {link: d} : d);

    tileData.forEach(tile => {

      const match = tile.link.match(/\/([a-z]{2})\//);
      if (match && match.index === 0) {
        tile.link = tile.link.replace(`${match[1]}/`, "");
      }

      if (tile.link.includes("profile")) {
        tile.entities = [];
        tile.link
          .replace("profile/", "")
          .match(/([^\/]{1,}\/[^\/]{1,})/g)
          .forEach(group => {
            const [slug, id] = group.split("/");
            tile.entities.push({slug, id});
          });
      }
      else {
        tile.entities = [{slug: tile.title, id: tile.title}];
      }
    });

    const entitySlugs = tileData
      .map(d => d.entities.map(e => e.slug));
    const uniqueSlugs = Array.from(new Set(merge(entitySlugs)));

    const profileRows = await db.profile_meta
      .findAll({where: {slug: uniqueSlugs}});

    const slugToDimension = profileRows
      .reduce((obj, d) => {
        obj[d.slug] = d.dimension;
        return obj;
      }, {});

    const entityIds = tileData
      .map(d => d.entities.map(e => e.id));
    const uniqueIds = Array.from(new Set(merge(entityIds)));

    const entityRows = await db.search
      .findAll({
        where: {
          [sequelize.Op.or]: {id: uniqueIds, slug: uniqueIds},
          dimension: Array.from(new Set(Object.values(slugToDimension)))
        },
        include: [{association: "content"}]
      });

    tileData = tileData.reduce((tileArray, tile) => {
      if (tile.link.includes("profile")) {
        tile.entities = tile.entities
          .reduce((arr, entity) => {
            const dim = slugToDimension[entity.slug];
            const e = entityRows.find(row => row.dimension === dim && [row.id, row.slug].includes(entity.id));
            if (e) {
              const content = e.content.find(c => c.locale === language) || e.content.find(c => c.locale === "en");
              arr.push({
                dimension: e.dimension,
                hierarchy: e.hierarchy,
                id: e.id,
                slug: entity.slug,
                title: content.name
              });
            }
            return arr;
          }, []);
        if (tile.entities.length && (tile.entities.length > 1 || !["geo"].includes(tile.entities[0].slug))) {
          tile.new = true;
        }
        if (tile.entities.length) {
          tileArray.push(tile);
        }
      }
      else {
        tileArray.push(tile);
      }
      tile.link = `${tile.link}`;
      return tileArray;
    }, []);

    return res.json(tileData);

  });

};

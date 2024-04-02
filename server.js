const express = require("express");
const server = express();
const cors = require("cors");
const colors = require("./colors.json");
const port = process.env.PORT || 3000;

server.use(cors());

server.listen(port, () => {
  console.log(`App running on Port: ${port}`);
});

//GETS ALL COLORS
server.get("/api/colors", (req, res) => {
  res.status(200).json({
    status: 200,
    statusText: "OK",
    message: "All css colors retrieved.",
    count: colors.length,
    colors: colors,
  });
});

//FIND COLOR BY NAME
server.get("api/name/:name", (req, res) => {
  const colorName = req.params.name.toLocaleLowerCase();

  const findName = colors.find(
    (colors) => colors.name.toLocaleLowerCase() === colorName
  );

  findName
    ? res.status(200).json({
        status: 200,
        statusText: "OK",
        message: `Retrieved single color for ${colorName}`,
        color: findName,
      })
    : res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `Could find ${colorName} color`,
        error: {
          code: "NOT_FOUND",
          message: `Color ${colorName} could not be found`,
        },
        //  Sherley va vous proposez
      });
});

//FIND COLOR BY HEX
server.get("/api/hex/:hex", (req, res) => {
  const colorHex = req.params.hex.toLocaleLowerCase();

  const findHex = colors.find(
    (color) => color.hex.toLocaleLowerCase() === colorHex
  );

  findHex
    ? res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Retrieved HEX color",
        color: findHex,
      })
    : res.status(404).send({
        status: 404,
        statusText: "Not Found",
        message: `Could not find ${colorHex} color`,
        error: {
          code: "NOT_FOUND",
          message: `Color ${colorHex} could not be found`,
        },
      });
});

//FIND COLORS BY THEME
server.get("/api/themes/:theme", (req, res) => {
  const theme = req.params.theme.toLocaleLowerCase();

  const findTheme = colors.filter(
    (color) => color.theme.toLocaleLowerCase() === theme
  );

  findTheme.length > 0
    ? res.status(200).json({
        status: 200,
        statusText: "OK",
        message: `All ${theme} themes retrieved`,
        count: findTheme.length,
        themes: findTheme,
      })
    : res.status(404).send({
        status: 404,
        statusText: "Not Found",
        message: `${theme} themes could not be found`,
        error: {
          message: `themes ${theme} not found`,
          code: "NOT_FOUND",
        },
      });
});

//FIND COLORS BY GROUP
server.get("/api/groups/:group", (req, res) => {
  const group = req.params.group.toLocaleLowerCase();

  const findGroups = colors.filter(
    (color) => color.group.toLocaleLowerCase() === group
  );

  findGroups.length > 0
    ? res.status(200).json({
        status: 200,
        statusText: "OK",
        message: `All ${group} groups retrived`,
        count: findGroups.length,
        groups: findGroups,
      })
    : res.status(404).send({
        status: 404,
        statusText: "Not Found",
        message: `${group} groups could not be found`,
        error: {
          message: `${group} group not found`,
          code: "NOT_FOUND",
        },
      });
});

server.use(function (req, res) {
  res.status(404).json({
    status: 404,
    statusText: "Not Found",
    message: "Invalid request",
    error: {
      message: "the request url is not valid",
      code: "INVALID_REQUEST",
    },
  });
});

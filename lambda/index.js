const cardDAO = require("./card/card-dao");

exports.handler = async (event) => {
  console.log("[handler]", JSON.stringify(event));

  const response = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify("Request Failed!"),
  };

  if (event.httpMethod == "GET" && event.path == "/card/all") {
    cardDAO.init();

    const readAll = await cardDAO.readAll();
    console.log("[handler]", "readAll", JSON.stringify(readAll));

    if (readAll) {
      response.statusCode = 200;
      response.body = JSON.stringify(readAll);
    }
  }

  if (event.httpMethod == "POST" && event.path == "/card/new") {
    cardDAO.init();

    const cardObj = JSON.parse(event.body);
    console.log("[handler]", "create", cardObj);

    const result = await cardDAO.create(cardObj);

    if (result) {
      response.statusCode = 200;
      response.body = JSON.stringify("Card Created!");
    }
  }

  return response;
};

// const elasticsearch = require("../../index");
const client = require("../../index");
const INDEX_NAME = "server_api_logs";

exports.putLog = async (params) => {
  try {
    const bodyData = {
      index: INDEX_NAME,
      body: {
        ...params,
        timestamp: new Date(),
      },
    };
    await client.index(bodyData);
    console.log("[SUCCESS]: ElasticSearchAPILog putLog method");
  } catch (error) {
    console.log(`[ERROR]:  ElasticSearchAPILog putLog method, error-message=${error.message}`);
    return;
  }
};

//   const response = await client.index({
//     index: "myindex",
//     type: "mytype",
//     id: "1",
//     body: {
//       title: "Test 1",
//       tags: ["y", "z"],
//       published: true,
//     },
//   });
// };

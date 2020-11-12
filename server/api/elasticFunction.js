const { Client } = require("@elastic/elasticsearch");
// connect to elastic search
const client = new Client({
    node: 'http://localhost:9200'
//   cloud: {
//     id:
//       "my-cluster:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbyRmNzMxYmQ1MWNmZDM0MzU5YjE1NjY0NWQ1NDZjOGM5YiQwMWYzYmM3MWQxZTc0ZmI4OTM4Njk2YTcwMGM0MzU4Mg==",
//   },
//   auth: {
//     username: "elastic",
//     password: "qHwY9vazBIE7U5d2FLUhV9gz",
//   },
});


//search in elastic search.
  const searchElastic = async (index,search)=>{
      if(index === 'songs'){
          const result = await client.search(
              {
                index: index,
                body: {
                  query: {
                    prefix: {
                      title:search
                    },
                  },
                },
              })
              return result
      }else{
          const result = await client.search(
              {
                index: index,
                body: {
                  query: {
                    prefix: {
                      name:search
                    },
                  },
                },
              })
              return result
      }
}
// get data from sql to elastic(initial elastic)
const updateElasticData = async(index, dataArray)=>{
    await client.indices.create(
        {
          index: index,
        }
      );
      const body = dataArray.flatMap((doc) => [
        { index: { _index: index } },
        doc,
      ]);
      const { body: bulkResponse } = await client.bulk({ refresh: true, body });
      if (bulkResponse.errors) {
        console.log("ERROR");
        return bulkResponse.errors;
      } else {
          const { body: count } = await client.count({ index: index });
          console.log(count);
        return bulkResponse;
      }
}

// post to elasticsearch
const postElastic= async (index, doc)=>{
    const newPost = await client.index({
        index: index,
        body: doc,
      });
      return newPost;
}
// delete from elasticsearch
const deletetElastic= async (index, id)=>{
    const newPost = await client.deleteByQuery({
        index: index,
        id: id,
      });
      return newPost;
}

module.exports = {searchElastic, updateElasticData, postElastic, }
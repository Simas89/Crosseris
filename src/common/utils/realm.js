import * as Realm from 'realm-web';

const realm = (function () {
  let collection = null;

  const init = async () => {
    const app = new Realm.App({
      id: 'realmdb-ukkiy',
      timeout: 10000,
    });
    const user = await app.logIn(Realm.Credentials.anonymous());
    const mongo = user.mongoClient('mongodb-atlas');
    const db = mongo.db('crosseris');
    collection = db.collection('levels');
  };

  const getData = async (callback) => {
    let isPassing = true;

    if (!collection) {
      isPassing = await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false);
          clearTimeout(timeout);
          console.log('fail');
        }, 5000);
        const interval = setInterval(() => {
          if (collection) {
            resolve(true);
            clearTimeout(timeout);
            clearInterval(interval);
          }
        }, 10);
      });
    }

    if (isPassing) {
      collection
        .aggregate([
          {
            $project: {
              _id: { $convert: { input: '$_id', to: 'string' } },
              cords: 1,
              date: 1,
              revealed: 1,
              stacks: 1,
              title: 1,
            },
          },
        ])
        .then((data) => callback(data));
    } else callback([]);
  };

  const uploadLevel = (lvl) => {
    collection.insertOne(lvl);
  };

  return {
    init: () => {
      return init();
    },
    getData: (callback) => {
      return getData(callback);
    },
    uploadLevel: (lvl) => {
      uploadLevel(lvl);
    },
  };
})();

export default realm;

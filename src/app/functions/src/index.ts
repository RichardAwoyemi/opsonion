const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin
    .auth()
    .listUsers()
    .then((userRecords: any) => {
      userRecords.users.forEach((user: any) => users.push(user));
      res.set('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(users));
      console.log('Request successful!');
    })
    .catch((error: any) => console.log('Request failed: ', error));
});

exports.countAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin
    .auth()
    .listUsers()
    .then((userRecords: any) => {
      userRecords.users.forEach((user: any) => users.push(user));
      const count: String = `{ "count": ${users.length} }`;
      res.set('Access-Control-Allow-Origin', '*');
      res.end(count);
      console.log('Request successful!');
    })
    .catch((error: any) => console.log('Request failed: ', error));
});

exports.getWebsiteNameById = functions.https.onRequest((req: any, res: any) => {
  let websiteId = req.url.split('/');
  websiteId = websiteId[websiteId.length - 1];
  res.set('Access-Control-Allow-Origin', '*');
  const website = admin.firestore().collection('websites').doc(websiteId).get();
  return website
    .then(function (response: any) {
      if (response.data()) {
        res.end(`{ "websiteName": "${response.data()['name']}" }`);
      } else {
        res.end(`{ "websiteName": null }`);
      }
      console.log('Request successful!');
    })
    .catch((error: any) => {
      console.log('Request failed: ', error);
      res.end(`{ "websiteId": null }`);
    });
});

exports.getWebsiteIdByName = functions.https.onRequest((req: any, res: any) => {
  let websiteName = req.url.split('/');
  websiteName = websiteName[websiteName.length - 1];
  res.set('Access-Control-Allow-Origin', '*');
  console.log(`Website id request made for: ${websiteName}`);
  const websitesRef = admin.firestore().collection('websites');
  websitesRef
    .where('name', '==', websiteName)
    .limit(1)
    .get()
    .then((snapshot: any) => {
      if (snapshot.empty) {
        console.log('Website id not found');
        res.end(`{ "websiteId": null }`);
      }
      snapshot.forEach((doc: any) => {
        console.log(`Website id found: ${doc.id}`);
        res.end(`{ "websiteId": "${doc.id}" }`);
      });
      console.log('Request successful!');
    })
    .catch((error: any) => {
      console.log('Request failed: ', JSON.stringify(error));
      res.end(`{ "websiteId": null }`);
    });
});

exports.createWebsite = functions.firestore.document('websites/{websiteId}').onCreate(() => {
  const ref = admin.firestore().collection('counters').doc('websites');
  return admin
    .firestore()
    .runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { counter: 1 });
        return 1;
      }
      const newCount = doc.data().counter + 1;
      transaction.update(ref, {
        counter: newCount,
      });
      return newCount;
    })
    .then((newCount: any) => {
      console.log(`Transaction successfully committed and new websites count is '${newCount}'.`);
    })
    .catch((error: any) => {
      console.log('Transaction failed: ', error);
    });
});

exports.deleteWebsite = functions.firestore.document('websites/{websiteId}').onDelete(() => {
  const ref = admin.firestore().collection('counters').doc('websites');
  return admin
    .firestore()
    .runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { counter: 0 });
        return 0;
      }
      const newCount = doc.data().counter - 1;
      transaction.update(ref, {
        counter: newCount,
      });
      return newCount;
    })
    .then((newCount: any) => {
      console.log(`Transaction successfully committed and new websites count is '${newCount}'.`);
    })
    .catch((error: any) => {
      console.log('Transaction failed: ', error);
    });
});

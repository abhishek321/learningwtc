const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = 'appv1';

const productCollectionName = 'products';
const salesCollectionName = 'sales';

const productData = [
    { name: 'Product A', description: 'Description for Product A' },
    { name: 'Product B', description: 'Description for Product B' },
    { name: 'Product C', description: 'Description for Product C' },
    { name: 'Product D', description: 'Description for Product D' },
    { name: 'Product E', description: 'Description for Product E' },
    { name: 'Product F', description: 'Description for Product F' },
    { name: 'Product G', description: 'Description for Product G' },
    { name: 'Product H', description: 'Description for Product H' },
    { name: 'Product I', description: 'Description for Product I' },
    { name: 'Product J', description: 'Description for Product J' },
];

const salesData = [
    { product: new ObjectId(), amount: 100, date: new Date('2023-01-01') },
    { product: new ObjectId(), amount: 150, date: new Date('2023-01-02') },
    { product: new ObjectId(), amount: 200, date: new Date('2023-01-03') },
    { product: new ObjectId(), amount: 120, date: new Date('2023-01-04') },
    { product: new ObjectId(), amount: 180, date: new Date('2023-01-05') },
    { product: new ObjectId(), amount: 90, date: new Date('2023-01-06') },
    { product: new ObjectId(), amount: 250, date: new Date('2023-01-07') },
    { product: new ObjectId(), amount: 170, date: new Date('2023-01-08') },
    { product: new ObjectId(), amount: 130, date: new Date('2023-01-09') },
    { product: new ObjectId(), amount: 160, date: new Date('2023-01-10') },
];

async function seedData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to the database');

        const db = client.db(dbName);

        // Drop the product collection if it already exists (for re-running the script)
        const productCollection = db.collection(productCollectionName);
        await productCollection.drop().catch(() => {});

        // Insert dummy data into the products collection
        const productResult = await productCollection.insertMany(productData);
        console.log(`${productResult.insertedCount} documents inserted into the ${productCollectionName} collection`);

        // Drop the sales collection if it already exists (for re-running the script)
        const salesCollection = db.collection(salesCollectionName);
        await salesCollection.drop().catch(() => {});

        // Insert dummy data into the sales collection
        const salesResult = await salesCollection.insertMany(salesData);
        console.log(`${salesResult.insertedCount} documents inserted into the ${salesCollectionName} collection`);

    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

seedData();

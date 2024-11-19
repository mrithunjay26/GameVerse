import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://mrithunjay26:77820897@comments.jx9xmpc.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
    await client.connect();
    return client.db('college_db');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, organizationName, email } = body;
        const database = await connectToDatabase();
        const apiKeyCollection = database.collection('api_keys');

        if (action === 'create') {
            // Check if the email already exists
            const existingUser = await apiKeyCollection.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ success: false, error: 'API key already exists for this user' });
            }

            // Generate a new API key
            const apiKey = new ObjectId().toString();
            const result = await apiKeyCollection.insertOne({
                organizationName,
                email,
                key: apiKey,
                createdAt: new Date(),
                status: 'active',
                recent_requests: []
            });

            // Return the API key and other details in the response body
            return NextResponse.json(
                {
                    success: true,
                    apiKey,
                    userId: result.insertedId,
                    organizationName,
                    email
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,  // Set the key in the response header
                    }
                }
            );
        }

        if (action === 'getData') {
            const user = await apiKeyCollection.findOne({ organizationName });
            if (!user) {
                return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                user: {
                    _id: user._id,
                    organizationName: user.organizationName,
                    email: user.email,
                    key: user.key,  // Return the API key in the response body
                    createdAt: user.createdAt,
                    status: user.status,
                    recent_requests: user.recent_requests
                }
            });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Failed to process request:', error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function GET(request: Request) {
    try {
        const database = await connectToDatabase();
        const apiKeyCollection = database.collection('api_keys');
        const allUsers = await apiKeyCollection.find({}).toArray();

        const formattedUsers = allUsers.map(user => ({
            _id: user._id,
            organizationName: user.organizationName,
            email: user.email,
            key: user.key,
            createdAt: user.createdAt,
            status: user.status,
            recent_requests: user.recent_requests
        }));

        return NextResponse.json({ success: true, users: formattedUsers });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    } finally {
        await client.close();
    }
}

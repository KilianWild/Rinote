import dbConnect from "@/db/dbConnect";
import Note from "@/db/models/Note";

export async function GET() {
  await dbConnect();

  const plants = await Note.find({}).sort({ _id: -1 });
  return Response.json(plants, { status: 200 });
}

export async function POST(request) {
  await dbConnect();

  console.log("POST");

  try {
    const body = await request.json();
    console.log("POST body:", body); // 👈 add t
    const note = await Note.create(body);
    return Response.json(note, { status: 201 });
  } catch (error) {
    console.log("POST error:", error.message); // 👈 and this
    return Response.json({ error: error.message }, { status: 400 });
  }
}

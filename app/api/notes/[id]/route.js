import dbConnect from "@/db/dbConnect";
import Note from "@/db/models/Note";

export async function PUT(request, { params }) {
  await dbConnect();

  const { id } = await params;
  const body = await request.json();
  const updated = await Note.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await dbConnect();

  const { id } = await params;
  const deleted = await Note.findByIdAndDelete(id);

  return Response.json(
    { message: "Deleted successfully", deleted },
    { status: 200 },
  );
}

//
//
//
//
/*
export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "DELETE") {
      await Plant.findByIdAndDelete(id);

      response.status(200).json({ message: "Sucess!" });
      return;
    }
    if (request.method === "PUT") {
      const updatedPlant = await Plant.findByIdAndUpdate(id, request.body, {
        new: true,
      });

      if (!updatedPlant) {
        return response.status(404).json({ message: "Plant not found" });
      }

      return response.status(200).json(updatedPlant);
    }

    if (request.method === "GET") {
      const plant = await Plant.findById(id);

      if (!plant) return response.status(400).json({ status: "bad request" });
      return response.status(200).json(plant);
    }
  } catch (error) {
    response.status(500).json({ messgae: "Internal Server Error." });
    return;
  }

  response.status(405).json({ stauts: "Method not allowed." });
}
*/

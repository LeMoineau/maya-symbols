import { firestore } from "../../config/database";
import { FirebaseDoc } from "../../types/firestore-types";

interface OperationBDFindingOptions {
    collection: string
}

export async function findAll(options: OperationBDFindingOptions): Promise<FirebaseDoc[]> {
    const collectionRef = await firestore.collection(options.collection).get();
    return collectionRef.docs
}
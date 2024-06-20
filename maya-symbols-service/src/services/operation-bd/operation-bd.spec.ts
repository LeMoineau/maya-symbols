import { findAll } from "./operation-bd"

describe('operation-bd', () => {
    it('should find all document when specify a collection', async () => {
        const docs = await findAll({
            collection: "signatures"
        })

        expect(docs.length).toBeGreaterThan(0)
    })
})
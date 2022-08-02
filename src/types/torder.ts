export type TOrder = {
  "ingredients": string[],
  "_id": string,
  "status": 'done' | 'created' | 'pending',
  "name": string,
  "number": number,
  "createdAt": string,
  "updatedAt": string
}

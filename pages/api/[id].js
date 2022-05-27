// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    // fs.writeFileSync('config/users.json', JSON.stringify(users, null, 4));

    const { id } = req.query;
    
    if(req.method === "POST") {

        const { body } = req;

        try {
            const users = fs.readFileSync(path.resolve(__dirname+`./config/${id}.json`));
            fs.writeFileSync(`config/${id}.json.bak`, JSON.stringify(users, null, 4));
        } catch(e) {
            fs.writeFileSync(`config/${id}.json`, JSON.stringify(body, null, 4));
        } finally {
            res.status(200).json({status:"User Created/Updated"})
        }


    } else if(req.method === "GET") {
        try {
            const users = JSON.parse(fs.readFileSync(path.resolve(`./config/${id}.json`)));
            res.status(200).json(users)
        } catch(e) {
            res.status(200).json({error: "No user Found"})
        }
    }
}
  
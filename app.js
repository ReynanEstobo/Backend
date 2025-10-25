import express from "express";

// Create an Express app
const app = express();


// Middleware 
app.use(express.json());

const port = 3000;

try{
    app.listen(port, () => {
        console.log('listening to port 3000...');
    });
}catch(e){
    console.log(e);
}

app.get('/reynan', async (request, response)=> {
    response.status(200).json({message: "Hello Im Reynan!"});
})
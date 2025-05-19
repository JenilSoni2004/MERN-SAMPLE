const User=require("../Model/user")
async function handlealluser(req,res) {
    const alldbuser=await User.find({})
    return res.json(alldbuser)
}
async function getuserbyid(req,res) {
    const user=await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
}
async function updateuser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,            // update with the data from frontend
      { new: true }        // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ status: "success", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function deleteuser(req,res)
{
   await User.findByIdAndDelete(req.params.id)
    return res.json({status:"success"})
}
async function handlecreatenewuser(req,res)
{
    const { firstName, lastName, email, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !jobTitle) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        const newUser = await User.create({ firstName, lastName, email, jobTitle });
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports={
    handlealluser,
    getuserbyid,
    updateuser,
    deleteuser,
    handlecreatenewuser
}
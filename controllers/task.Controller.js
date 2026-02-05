export const getTasks = (req,res) => {
    res.json({
        message:"Porotect task accessed",
        userId: req.user
    });
}
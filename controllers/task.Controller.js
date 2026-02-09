
const Task = require("../models/tasks");


exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, search } = req.query;


    let filter = { user: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, status } = req.body;

//     if (!title) {
//       return res.status(400).json({ message: "Title is required" });
//     }

//     const task = await Task.create({
//       title,
//       description,
//       status,
//       user: req.user.id,
//     });

//     res.status(201).json({
//       success: true,
//       task,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

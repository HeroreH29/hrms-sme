import Employee from "../models/Employee.js";

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
export const addEmployee = async (req, res, next) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.json({ message: `Employee ${newEmployee.empID} added!` });
  } catch (error) {
    next(error);
  }
};
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: `Employee ${updatedEmployee.empID} updated!` });
  } catch (error) {
    next(error);
  }
};

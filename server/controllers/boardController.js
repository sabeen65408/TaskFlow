const Board = require("../models/Board");

const createDefaultBoard = async(projectId)=>{

    return await Board.create({

        project:projectId,

        columns:[

            {
                title:"Todo",
                order:1
            },

            {
                title:"In Progress",
                order:2
            },

            {
                title:"Review",
                order:3
            },

            {
                title:"Done",
                order:4
            }

        ]

    });

};


const getBoard = async (req, res) => {

    try {

        const board = await Board.findOne({
            project: req.params.projectId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        res.json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const addColumn = async (req, res) => {

    try {

        const board = await Board.findOne({
            project: req.params.projectId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        board.columns.push({

            title: req.body.title,

            order: board.columns.length + 1

        });

        await board.save();

        res.json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const renameColumn = async (req, res) => {

    try {

        const board = await Board.findOne({
            project: req.params.projectId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        const column = board.columns.id(req.params.columnId);

        if (!column) {
            return res.status(404).json({
                message: "Column not found"
            });
        }

        column.title = req.body.title;

        await board.save();

        res.json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteColumn = async (req, res) => {

    try {

        const board = await Board.findOne({
            project: req.params.projectId
        });

        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            });
        }

        board.columns.pull(req.params.columnId);

        await board.save();

        res.json(board);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createDefaultBoard,
    getBoard,
    addColumn,
    renameColumn,
    deleteColumn
};
const express = require('express')
const { getProgrammingLanguages, createProgrammingLanguage, getProgrammingLanguageById, updateProgrammingLanguage, removeProgrammingLanguage } = require('../services/proglangs');
const { getStudents } = require('../services/students');

const router = express.Router()

// ROUTES //

router.get('/proglangs', (req, res) => {
    const progLangs = getProgrammingLanguages()

    const data = {
        newProgLangButton: {
            url: '/create-proglang',
            title: 'Create programming language'
        },
        progLangs
    };

    res.render('proglangs', data)
});


router.get('/proglangs/:id', (req, res) => {
    const { id } = req.params

    const progLang = getProgrammingLanguageById(id)

    if (!progLang) {
        return res.render('proglang', { progLang: null, id })
    }

    const students = getStudents()

    const interestedStudents = students.filter(student =>
        student.interests.includes(progLang.name)
    );

    res.render('proglang', { progLang, id, interestedStudents })
})


router.get('/create-proglang', (req, res) => {
    res.render('create-proglang')
})


router.post('/proglang-created', (req, res) => {
    const { body } = req;

    const createdProgLang = createProgrammingLanguage(body);

    res.redirect(`/proglangs/${createdProgLang.id}`);
})


router.get('/edit-proglang/:id', (req, res) => {
    const { id } = req.params

    const progLang = getProgrammingLanguageById(id)

    if (!progLang) {
        return res.send('<h1>Programming language not found</h1>')
    }

    res.render('edit-proglang', { progLang })
})


router.post('/proglang-edited/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    const updatedProgLang = updateProgrammingLanguage({ ...body, id })

    res.redirect(`/proglangs/${updatedProgLang.id}`)
})


router.post('/delete-proglang', (req, res) => {
    const { progLangId } = req.body

    removeProgrammingLanguage(progLangId)

    res.redirect('/proglangs')
})

module.exports = router
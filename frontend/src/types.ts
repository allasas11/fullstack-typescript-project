export interface Student {
    _id: string
    name: string
    surname: string
    age: number
    interests: ProgrammingLanguage[]
    groupId?: Group
}

export interface Group {
    _id: string
    name: string
    description: string
    students: Student[]
}

export interface ProgrammingLanguage {
    _id: string
    name: string
    description: string
    students: Student[]
}

export interface Lecturer {
    _id: string
    name: string
    surname: string
    age: number
    subjects: Subject[]
    groups: Group[]
}

export interface Subject {
    _id: string
    name: string
    description: string
    proglangs: ProgrammingLanguage[]
}
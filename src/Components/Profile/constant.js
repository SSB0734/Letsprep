export const FORM_FIELDS = [
    {
        lable: "First Name",
        name: "firstName",
        required: true,
        type: 'text',
        xs: 6
    },
    {
        lable: "Last Name",
        name: "lastName",
        required: true,
        type: 'text',
        xs: 6
    },
    {
        lable: "Email",
        name: "email",
        required: true,
        disabled: true,
        type: 'email',
        xs: 12
    },
    // {
    //     lable: "Contact Number",
    //     name: "contact",
    //     required: true,
    //     type: 'tel',
    //     xs: 12
    // },

]

export const FORM_FIELDS_EDIT_COMMUNITY = [
    {
        lable: "User Name",
        name: "username",
        required: true,
        type: 'text',
        xs: 6
    },
    {
        lable: "Contact",
        name: "contact",
        required: true,
        type: 'text',
        xs: 6
    },
    {
        lable: "LinkedIn Profile Link",
        name: "linkedln",
        required: true,
        type: 'tel',
        xs: 12
    },
    {
        lable: "Technical skills",
        name: "techSkills",
        required: true,
        type: 'select',
        isSelect: true,
        options: ["JS", "Java", "C++", "SQL"],
        isMulti: true,
        xs: 12
    },
    {
        lable: "College",
        name: "college",
        required: true,
        type: 'select',
        options: ["IET DAVV", "Medi-Caps University", "SVVV", "SGSITS"],
        isSelect: true,
        xs: 12
    },
    {
        lable: "Branch",
        name: "branch",
        required: true,
        type: 'select',
        options: ["Computer Engineering", "Information Technology",
            "Electronics & Instrumentation Engineering",
            "Mechanical Engineering",
            "Electronics & Telecommunication Engineering",
            "Civil Engineering"],
        isSelect: true,
        xs: 4
    },
    {
        lable: "Section",
        name: "section",
        required: true,
        type: 'select',
        options: ["A", "B", "C", "D"],
        isSelect: true,
        xs: 4
    },
    {
        lable: "Passout Year",
        name: "passoutyear",
        required: true,
        type: 'select',
        isSelect: true,
        options: ["2023", "2024", "2025", "2026"],
        xs: 4,
    }
]

// firstName
// lastName
// email
// contact
// college
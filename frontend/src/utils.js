
function fixDate(date) {
    return String(date).slice(0, String(date).slice(0, String(date).lastIndexOf('.')).lastIndexOf(':')).split('T').join(' ~ ').split('-').join('/')
}

const handleForm = () => {
    setShowForm(p => !p)
    if (!showForm) {
        setText("Hide Form");
        setIcon("close")
    } else {
        setText("Add Resource");
        setIcon("plus")
    }
}


export {fixDate, handleForm}
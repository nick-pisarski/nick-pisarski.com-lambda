exports.insert = (table_name, columns, values) => {
    const vals = columns.map((val, iter) => `$${iter+1}`).join(', ');
    return {
        text: `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES (${vals}) RETURNING *`,
        values
    }
}

exports.insertMany = (table_name, columns, values) => {
    const vals = columns.map((val, iter) => `$${iter+1}`).join(', ');
    let text = `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES `    
    text += values.map(val => `(${vals})`).join(', ') + " RETURNING *";
    return {text, values}
}

exports.select = (table_name, columns=['*']) => {
    return `SELECT ${columns.join(', ')} FROM ${table_name}`
}
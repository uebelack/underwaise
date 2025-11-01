import os
import pyodbc

conn = pyodbc.connect(os.getenv("SQL_CONN_STRING"))



with open('../../../../assets/application_and_feature_inserts_2.sql', 'r') as inserts:
    sql_script = inserts.read()  # read the entire file as a single string
    statements = sql_script.split(';')  # split by semicolon

    for statement in statements:
        statement = statement.strip()
        if statement:  # skip empty statements
            with conn.cursor() as cur:
                cur.execute(statement)
    conn.commit()  # commit all changes after execution

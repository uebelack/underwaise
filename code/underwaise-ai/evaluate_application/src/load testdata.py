import os
import pyodbc

conn = pyodbc.connect(os.getenv("SQL_CONN_STRING"))

query = """
    SELECT * FROM dbo.application_feature;
    """

with open('../../../../assets/health_applications_test_data.sql', 'r') as inserts:
    sql_script = inserts.read()  # read the entire file as a single string
    statements = sql_script.split(';')  # split by semicolon

    for statement in statements:
        statement = statement.strip()
        if statement:  # skip empty statements
            with conn.cursor() as cur:
                cur.execute(statement)
    conn.commit()  # commit all changes after execution

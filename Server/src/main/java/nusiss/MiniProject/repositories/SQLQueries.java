package nusiss.MiniProject.repositories;

public class SQLQueries {
    
    public static final String AUTHENTICATE_USER = "select * from registered where email = ?";

    public static final String REGISTER_USER = """
        insert into registered(name, email, encrypted_password) 
        values (?, ?, ?);        
    """;

    public static final String SIGN_IN_WITH_GOOGLE = """
        insert into registered(name, email)
        values (?, ?);        
    """;
    
}
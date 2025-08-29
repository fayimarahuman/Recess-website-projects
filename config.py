class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@localhost/caroline_ways_ltd_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "your_super_secret_key"
    JWT_SECRET_KEY = "your_jwt_secret_key"
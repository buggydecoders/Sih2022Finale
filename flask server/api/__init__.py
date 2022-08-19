from flask import Flask
from .sa import sa
from .recommendation import recommendation
from .verifySignature import verifySignature


def create_app():
    app = Flask(__name__)
    app.register_blueprint(sa,url_prefix='/sentiments')
    app.register_blueprint(recommendation,url_prefix='/recommendation')
    app.register_blueprint(verifySignature,url_prefix='/verify-signature')

    return app
from setuptools import setup

setup(
    name='api',
    packages=[
        'api', 
        'site_user', 
        'point', 
        'jwt_token', 
        'todo', 
        'vocab', 
        'general_ledger', 
        'videos', 
        'mail_in_service',
        'automation',
        'decorators',
        'web_service',
        'repair_service',
        'helpers'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
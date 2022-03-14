from setuptools import setup

setup(
    name='api',
    packages=['api', 'data', 'user', 'point', 'jwt_token', 'todo', 'vocab'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
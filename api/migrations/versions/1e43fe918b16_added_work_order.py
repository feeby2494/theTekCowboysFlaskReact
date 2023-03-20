"""added work order

Revision ID: 1e43fe918b16
Revises: 8e4dccf12a0d
Create Date: 2022-12-14 12:06:58.997484

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e43fe918b16'
down_revision = '8e4dccf12a0d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.create_table('point',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('title', sa.String(), nullable=False),
    # sa.Column('explanation', sa.String(), nullable=False),
    # sa.Column('language', sa.String(), nullable=False),
    # sa.Column('chapter', sa.String(), nullable=True),
    # sa.Column('example1', sa.String(), nullable=True),
    # sa.Column('example2', sa.String(), nullable=True),
    # sa.Column('example3', sa.String(), nullable=True),
    # sa.Column('created_by', sa.Integer(), nullable=False),
    # sa.Column('date_created', sa.Date(), nullable=False),
    # sa.ForeignKeyConstraint(['created_by'], ['site_user.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('todo',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('text', sa.String(length=50), nullable=True),
    # sa.Column('complete', sa.Boolean(), nullable=True),
    # sa.Column('user_id', sa.Integer(), nullable=False),
    # sa.ForeignKeyConstraint(['user_id'], ['site_user.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('element',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('point_id', sa.Integer(), nullable=False),
    # sa.Column('text', sa.String(), nullable=False),
    # sa.Column('type', sa.String(), nullable=False),
    # sa.ForeignKeyConstraint(['point_id'], ['point.id'], ),
    # sa.PrimaryKeyConstraint('id')
    # )
    pass
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('element')
    op.drop_table('todo')
    op.drop_table('point')
    # ### end Alembic commands ###

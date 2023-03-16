"""empty message

Revision ID: 84c62c8bb1bc
Revises: ab90a4031bfa
Create Date: 2023-03-16 15:54:13.859365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84c62c8bb1bc'
down_revision = 'ab90a4031bfa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('line_one', sa.String(length=127), nullable=True),
    sa.Column('line_two', sa.String(length=127), nullable=True),
    sa.Column('city', sa.String(length=127), nullable=True),
    sa.Column('state', sa.String(length=127), nullable=True),
    sa.Column('postal_code', sa.String(length=127), nullable=True),
    sa.Column('country', sa.String(length=127), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=127), nullable=True),
    sa.Column('email', sa.String(length=127), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('submitted_date', sa.DateTime(), nullable=False),
    sa.Column('contact', sa.Integer(), nullable=True),
    sa.Column('address', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['address'], ['order_address.id'], ),
    sa.ForeignKeyConstraint(['contact'], ['order_contact.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['site_user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('device',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brand', sa.String(length=127), nullable=True),
    sa.Column('model', sa.String(length=127), nullable=True),
    sa.Column('issue', sa.String(length=255), nullable=True),
    sa.Column('serial_number', sa.String(length=127), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('received_by', sa.DateTime(), nullable=False),
    sa.Column('finished_by', sa.DateTime(), nullable=True),
    sa.Column('work_order_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['work_order_id'], ['work_order.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('device')
    op.drop_table('order')
    op.drop_table('order_contact')
    op.drop_table('order_address')
    # ### end Alembic commands ###

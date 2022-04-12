class Sale < ApplicationRecord
    has_many :saleitems
    has_many :items, through: :saleitems
    belongs_to :employee
end

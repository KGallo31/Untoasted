class Item < ApplicationRecord
    has_many :saleitems
    has_many :sales, through: :items
    has_many :receiptitmes
end

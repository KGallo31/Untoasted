class Receiptitem < ApplicationRecord
    belongs_to :item
    belongs_to :receipt
end
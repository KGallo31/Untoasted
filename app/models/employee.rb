class Employee < ApplicationRecord
    has_secure_password
    has_many :sales
    validates :username, uniqueness: true
    validate :pin, on: :create



    def pin
        pin = self.password
        if !pin.present? || !pin.match?(/\A\d{4,4}\z/)
            errors.add(:password, "Only four digit number")
        end
    end
end

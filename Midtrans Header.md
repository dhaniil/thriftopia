## Membuat PAyment Snaptoken
curl --request POST \
     --url https://app.sandbox.midtrans.com/snap/v1/transactions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "transaction_details": {
    "order_id": "order-id",
    "gross_amount": 10000
  },
  "credit_card": {
    "secure": true
  }
}
'

## Mencetak Invoice
{
    "order_id": "7950c36a-d267-4f25-bb03-7a82b00z168t",
    "invoice_number": "7128c81b-cde5-4c33-8777-4d1d0fcd6377",
    "due_date": "2025-08-06 20:03:04 +0700",
    "invoice_date": "2025-01-06 20:03:04 +0700",
    "customer_details": {
        "id": "customer_id",
        "name": "merchant A",
        "email": "merchant@midtrans.com",
        "phone": "82313123123"
    },
    "payment_type": "payment_link",
    "reference": "reference",
    "item_details": [
        {
            "item_id": "SKU1111",
            "description": "midtrans pillow",
            "quantity": 1,
            "price": 2000
        }
    ],
    "notes": "just a notes",
    "payment_link": {
        "is_custom_expiry": true,
        "enabled_payments": [
            "bca_va"
        ],
        "credit_card": {
            "secure": true,
            "type": "authorize",
            "bank": "bni",
            "whitelist_bins": [
                "48111111"
            ],
            "installment": {
                "required": true,
                "terms": {
                    "mandiri": [
                        3
                    ],
                    "bca": [
                        3
                    ],
                    "bni": [
                        3
                    ],
                    "bri": [
                        3
                    ],
                    "cimb": [
                        3
                    ],
                    "maybank": [
                        3
                    ],
                    "offline": [
                        3
                    ]
                }
            }
        },
        "bca_va": {
            "number": "12345678901",
            "free_text": {
                "inquiry": [
                    {
                        "id": "id inquiry",
                        "en": "en inquiry"
                    }
                ],
                "payment": [
                    {
                        "id": "id payment",
                        "en": "en payment"
                    }
                ]
            }
        },
        "bni_va": {
            "number": "12312312312"
        },
        "permata_va": {
            "number": "12312312312",
            "recipient_name": "name"
        },
        "bri_va": {
            "number": "12312312312"
        },
        "cimb_va": {
            "number": "12312312312"
        },
        "expiry": {
            "unit": "months",
            "duration": 1,
            "start_time": "2025-02-21 09:48:29 +0700"
        }
    },
    "amount": {
        "vat": "12313",
        "discount": "1000",
        "shipping": "11"
    }
}
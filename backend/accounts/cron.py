from datetime import timedelta, date

from accounts.models import User
from subscriptions.models import Plan

from subscriptions.models import Invoice


def charge_user(user):
    invoice = Invoice.objects.create(
        user=user,
        plan=user.plan,
        date=date.today(),
        amount=user.plan.price,
        paid=False
    )
    if user.card:
        invoice.card = user.card
        invoice.paid = True
    invoice.save()
    user.invoices.add(invoice)
    return invoice.paid


def generate_future_invoice(user, time):
    invoice = Invoice.objects.create(
        user=user,
        plan=user.plan,
        date=date.today() + timedelta(days=time),
        amount=user.plan.price,
        paid=False
    )
    invoice.save()
    user.invoices.add(invoice)
    return invoice.paid


def make_payment_daily():
    allUser = User.objects.all()

    for user in allUser:
        if user.plan is not None:
            if user.plan.is_yearly:
                if date.today() == user.plan_start_date + \
                        timedelta(days=365) and charge_user(user):
                    generate_future_invoice(user, 365)

            elif date.today() == user.plan_start_date\
                    and charge_user(user):
                generate_future_invoice(user, 30)

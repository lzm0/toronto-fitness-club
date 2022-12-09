from django.db import models


class Plan(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_yearly = models.BooleanField()

    def __str__(self):
        return self.name


class Invoice(models.Model):
    user = models.ForeignKey(to='accounts.User', on_delete=models.CASCADE, related_name='invoices')
    plan = models.ForeignKey(to='subscriptions.Plan', on_delete=models.PROTECT, related_name='invoices')
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    card = models.ForeignKey(to='accounts.Card', on_delete=models.PROTECT, related_name='invoices', null=True)
    paid = models.BooleanField()

    def __str__(self):
        return f"{self.user.username} {self.plan.name} {self.date}"

from datetime import datetime

from django.db import models


class Okopf(models.Model):
    """Общероссийский Классификатор Организационно-Правовой Формы (ОКОПФ)"""
    code = models.IntegerField(
        primary_key=True,
        help_text="Код ОКОПФ"
    )
    parent_code = models.ForeignKey(
        "self",
        models.CASCADE,
        blank=True,
        null=True,
        db_column="parent_code",
        help_text="Родительский код ОКОПФ"
    )
    name = models.TextField(
        help_text="Наименование ОКОПФ"
    )

    class Meta:
        verbose_name_plural = "okopf"

    def __str__(self):
        return f"{self.code}: {self.name}"


class Okved(models.Model):
    """Общероссийский Классификатор Видов Экономической деятельности (ОКВЭД)"""
    code = models.TextField(
        primary_key=True,
        help_text="Код ОКВЭД"
    )
    parent_code = models.ForeignKey(
        "self",
        models.CASCADE,
        blank=True,
        null=True,
        db_column="parent_code",
        help_text="Родительский код ОКВЭД"
    )
    name = models.TextField(
        help_text="Наименование ОКВЭД"
    )

    class Meta:
        verbose_name_plural = "okved"

    def __str__(self):
        return f"{self.code}: {self.name}"


class Region(models.Model):
    """Справочник регионов РФ"""
    code = models.IntegerField(
        primary_key=True,
        help_text="Код региона РФ"
    )
    name = models.TextField(
        unique=True,
        help_text="Наименование региона РФ"
    )

    class Meta:
        verbose_name_plural = "region"

    def __str__(self):
        return f"{self.code}: {self.name}"


class Company(models.Model):
    """Карточка компании"""
    name = models.TextField(
        unique=True,
        help_text="Полное русскоязычное название компании"
    )
    inn = models.TextField(
        help_text="ИНН компании"
    )
    kpp = models.TextField(
        help_text="КПП компании"
    )
    registration_date = models.DateField(
        blank=True,
        null=True,
        help_text="Дата постановки на учет в налоговом органе"
    )
    email = models.EmailField(
        blank=True,
        null=True,
        help_text="Контактный email компании"
    )
    link = models.URLField(
        blank=True,
        null=True,
        help_text="Ссылка на веб-сайт компании"
    )
    region = models.ForeignKey(
        Region,
        on_delete=models.DO_NOTHING,
        help_text="Регион компании"
    )
    okopf = models.ForeignKey(
        Okopf,
        on_delete=models.DO_NOTHING,
        help_text="Организационно-правовая форма компании"
    )

    class Meta:
        verbose_name_plural = "companies"
        unique_together = ("inn", "kpp",)

    def __str__(self):
        return f"{self.name}"

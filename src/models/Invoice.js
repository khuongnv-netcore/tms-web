import { getModelPropDefaultValue as getDefault, parseFloatTofix } from '../utils/common'

export default class Invoice {
  constructor(data, initModel = true) {
    if (initModel) {
      this.init(data)
    }
  }

  getMonthlyUsageStat = (monthlyUsageStat) => {
    return {
        showerElectricitySaved: parseFloatTofix(getDefault(monthlyUsageStat.showerElectricitySaved, 'number')),
        showerElectricityUsage: parseFloatTofix(getDefault(monthlyUsageStat.showerElectricityUsage, 'number')),
        showerGasSaved: parseFloatTofix(getDefault(monthlyUsageStat.showerGasSaved, 'number')),
        showerGasUsage: parseFloatTofix(getDefault(monthlyUsageStat.showerGasUsage, 'number')),
        showerWaterSaved: parseFloatTofix(getDefault(monthlyUsageStat.showerWaterSaved, 'number')),
        showerWaterUsage: parseFloatTofix(getDefault(monthlyUsageStat.showerWaterUsage, 'number'))
    }
  }

  getSavingWeekly = (savingWeekly) => {
    return savingWeekly.map((item) => {
      return {
        weekNumber: getDefault(item.weekNumber, 'number'),
        savingThisRange: parseFloatTofix(getDefault(item.savingThisRange, 'number')),
        savingLastRange: parseFloatTofix(getDefault(item.savingLastRange, 'number')),
      }
    });
  }

  getBillSavingForRange = (billSavingForRange) => {
    return billSavingForRange.map((item) => {
      return {
        billByDate: parseFloatTofix(getDefault(item.billByDate, 'number')),
        savingByDate: parseFloatTofix(getDefault(item.savingByDate, 'number')),
        targetDate: getDefault(item.targetDate, 'date'),
      }
    });
  }

  getBillSummary = (billSummary) => {
    return {
      paymentDate: getDefault(billSummary.paymentDate, 'date'),
      previousAmountDue: parseFloatTofix(getDefault(billSummary.previousAmountDue, 'number')),
      currentCharges: parseFloatTofix(getDefault(billSummary.currentCharges, 'number')),
      paymentReceived: parseFloatTofix(getDefault(billSummary.paymentReceived, 'number')),
      totalAmountDue: parseFloatTofix(getDefault(billSummary.totalAmountDue, 'number')),
    }
  }

  getSavingCurrentBill = (savingCurrentBill) => {
    return {
      totalSaving: parseFloatTofix(getDefault(savingCurrentBill.totalSaving, 'number')),
      billAmount: parseFloatTofix(getDefault(savingCurrentBill.billAmount, 'number')),
      dueDate: getDefault(savingCurrentBill.dueDate, 'date'),
    }
  }

  init(data) {
    const { id, created, modified,
        name, city, state, streetAddress, 
        zipCode, franchiseId, franchiseName, franchiseLogoUrl,
        roomCount, contactName, contactPhone,
        contactEmail, accountNumber, electricCost_DollarsPerkWh,
        electricHeatPumpRE_Percent, electricResistRE_Percent,
        galPerMin, gasCost_DollarsPerTherm, gasRE_Percent, electricSavedDollar,
        gasSavedDollar, hotSetPoint_F, inletTemp_F, sewageCost_DollarsPerKgal,
        sewageSavedDollar, waterCost_DollarsPerKgal, waterSavedDollar, monthlyUsageStat,
        savingWeekly, billSavingForRange, billSummary, savingCurrentBill, dateRange
    } = data

    this.id = getDefault(id, 'string')
    this.created = getDefault(created, 'date')
    this.modified = getDefault(modified, 'date')

    // information
    this.name = getDefault(name, 'string')
    this.city = getDefault(city, 'string')
    this.state = getDefault(state, 'string')
    this.streetAddress = getDefault(streetAddress, 'string')
    this.zipCode = getDefault(zipCode, 'string')
    this.franchiseId = getDefault(franchiseId, 'string')
    this.franchiseName = getDefault(franchiseName, 'string')
    this.franchiseLogoUrl = getDefault(franchiseLogoUrl, 'string')
    this.roomCount = getDefault(roomCount, 'number')
    this.accountNumber = getDefault(accountNumber, 'number')
    this.contactName = getDefault(contactName, 'string')
    this.contactPhone = getDefault(contactPhone, 'string')
    this.contactEmail = getDefault(contactEmail, 'string')

    this.electricCostDollarsPerkWh = getDefault(electricCost_DollarsPerkWh, 'number')
    this.electricHeatPumpREPercent = getDefault(electricHeatPumpRE_Percent, 'number')
    this.electricResistREPercent = getDefault(electricResistRE_Percent, 'number')
    this.galPerMin = getDefault(galPerMin, 'number')
    this.gasCostDollarsPerTherm = getDefault(gasCost_DollarsPerTherm, 'number')
    this.gasSavedDollar = parseFloatTofix(getDefault(gasSavedDollar, 'number'))
    this.electricSavedDollar = parseFloatTofix(getDefault(electricSavedDollar, 'number'))
    this.hotSetPointF = getDefault(hotSetPoint_F, 'number')
    this.inletTempF = getDefault(inletTemp_F, 'number')
    this.sewageCostDollarsPerKgal = getDefault(sewageCost_DollarsPerKgal, 'number')
    this.sewageSavedDollar = parseFloatTofix(getDefault(sewageSavedDollar, 'number'))
    this.waterCostDollarsPerKgal = getDefault(waterCost_DollarsPerKgal, 'number')
    this.waterSavedDollar = parseFloatTofix(getDefault(waterSavedDollar, 'number'))
    this.gasREPercent = getDefault(gasRE_Percent, 'number')
    
    this.monthlyUsageStat = this.getMonthlyUsageStat(getDefault(monthlyUsageStat, 'object'))
    this.savingWeekly = this.getSavingWeekly(getDefault(savingWeekly, 'object'))
    this.billSavingForRange = this.getBillSavingForRange(getDefault(billSavingForRange, 'object'))
    this.billSummary = this.getBillSummary(getDefault(billSummary, 'object'));
    this.savingCurrentBill = this.getSavingCurrentBill(getDefault(savingCurrentBill, 'object'));
    this.dateRange = getDefault(dateRange, 'number')
  }

  toPlainObject() {
    return {
      id: this.id,
      created: this.created,
      modified: this.modified,

      name: this.name,
      city: this.city,
      state: this.state,
      streetAddress: this.streetAddress,
      zipCode: this.zipCode,
      franchiseId: this.franchiseId,
      franchiseName: this.franchiseName,
      roomCount: this.roomCount,
      accountNumber: this.accountNumber,
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
      franchiseLogoUrl: this.franchiseLogoUrl,
      
      electricCostDollarsPerkWh: this.electricCostDollarsPerkWh,
      electricHeatPumpREPercent: this.electricHeatPumpREPercent,
      electricResistREPercent: this.electricResistREPercent,
      galPerMin: this.galPerMin,
      gasCostDollarsPerTherm: this.gasCostDollarsPerTherm,
      gasSavedDollar: this.gasSavedDollar,
      electricSavedDollar: this.electricSavedDollar,
      hotSetPointF: this.hotSetPointF,
      inletTempF: this.inletTempF,
      sewageCostDollarsPerKgal: this.sewageCostDollarsPerKgal,
      sewageSavedDollar: this.sewageSavedDollar,
      waterCostDollarsPerKgal: this.waterCostDollarsPerKgal,
      waterSavedDollar: this.waterSavedDollar,
      gasREPercent: this.gasREPercent,
      monthlyUsageStat: this.monthlyUsageStat,
      savingWeekly: this.savingWeekly,
      billSavingForRange: this.billSavingForRange,
      billSummary: this.billSummary,
      savingCurrentBill: this.savingCurrentBill,
      dateRange: this.dateRange,
    }
  }
}

export interface Field {
  id: string;
  question?: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  options: { value: string; label: string }[] | undefined;
  helperText?: string;
  default?: string;
  followUp?: {
    trigger: string;
    fields: Field[];
  };
}

export interface Section {
  id: string;
  title: string;
  fields: Field[];
}

export type BaseHealthRecord = {
  startDate: string;
  endDate: string | null;
  reason: string;
  isTreatmentCompleted: boolean;
};

export type HealthCondition = {
  treatmentFacilityAddress: string;
} & BaseHealthRecord;

export type Medication = {
  medicationNameAndDosage: string;
  medicationPeriodicity: MedicationPeriodicity;
} & BaseHealthRecord;

export type Incapacity = {} & BaseHealthRecord;

export type FormValues = {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  height: string;
  weight: string;

  isSmoker: boolean;
  isDrugUser: boolean;
  hasSpecialSports: boolean;
  specialSportActivities: string;

  hasPhysicalHealthConditions?: boolean;
  physicalHealthConditions: HealthCondition[];

  hasMentalHealthConditions?: boolean;
  mentalHealthConditions: HealthCondition[];

  hasMedicationUsage?: boolean;
  medicationForm: Medication[];

  hasIncapacity?: boolean;
  incapacityForm: Incapacity[];
};

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset (update file path if needed)
df = pd.read_csv('/kaggle/input/data-analytics/CrimesOnWomenData.csv')

# Rename columns for clarity if needed
df.rename(columns={'K&A': 'Kidnap_Abduct', 'DD': 'Dowry_Deaths', 'AoW': 'Assault_Women',
                   'AoM': 'Assault_Minors', 'DV': 'Domestic_Violence', 'WT': 'Trafficking'}, inplace=True)

# Drop unnecessary columns
df.drop(columns=['Unnamed: 0'], inplace=True)

# Handle missing values
df.fillna(0, inplace=True)

# Feature engineering: Total crimes
crime_cols = ['Rape', 'Kidnap_Abduct', 'Dowry_Deaths', 'Assault_Women', 
              'Assault_Minors', 'Domestic_Violence', 'Trafficking']
df['Total_Crimes'] = df[crime_cols].sum(axis=1)

# Summary statistics
print(df.describe())

# Visualization 1: Top 10 states by total crimes
top_states = df.groupby('State')['Total_Crimes'].sum().sort_values(ascending=False).head(10)
top_states.plot(kind='bar', figsize=(10,5), title='Top 10 States by Total Crimes')
plt.ylabel('Total Crimes'); plt.xticks(rotation=45); plt.tight_layout(); plt.show()

# Visualization 2: Trend of total crimes by year
yearly_trend = df.groupby('Year')['Total_Crimes'].sum()
yearly_trend.plot(marker='o', figsize=(10,5), title='Crimes Against Women Over Years')
plt.ylabel('Total Crimes'); plt.grid(True); plt.tight_layout(); plt.show()

# Visualization 3: Heatmap of crime correlations
plt.figure(figsize=(8,6))
sns.heatmap(df[crime_cols + ['Total_Crimes']].corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Between Crime Types')
plt.tight_layout()
plt.show()




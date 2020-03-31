// Config FTag

const FTag = {
	ACIDSUB:	{str: 'ACIDSUB', descr: 'Bomba do Ácido', des: 'Bomba Ácido',}, 
	ACIDT:		{str: 'ACIDT', descr: 'Volume Total de Ácido', des: 'Vol Tot Ácido',},
	AFOAMT:		{str: 'AFOAMT', descr: 'Volume Total de Anti-Foam', des: 'Vol Tot Anti-Foam',},
	AIROV_B:	{str: 'AIROV_B', descr: '', des: '',},
	AIRSP_A:	{str: 'AIRSP_A', descr: 'Fluxo de Ar de Entrada no Sparger', des: 'Fluxo Ar',},
	BASESUB:	{str: 'BASESUB', descr: 'Bomba da Base', des: 'Bomba Base',},
	BASET:		{str: 'BASET', descr: 'Volume Total de Base', des: 'Vol Tot Base',},
	CO2SP_A:	{str: 'CO2SP_A', descr: '', des: '',},
	ExCO2:		{str: 'ExCO2', descr: 'Concentração de CO2 de Saída', des: '[CO2] Saída',},
	ExO2:		{str: 'ExO2', descr: 'Concentração de O2 de Saída', des: '[O2] Saída',},
	EXT_A:		{str: 'EXT_A', descr: '', des: '',},
	EXT_B:		{str: 'EXT_B', descr: '', des: '',},
	EXT_E:		{str: 'EXT_E', descr: 'Concentração de Metanol de Saída', des: '[Metanol] Saída',},
	EXT_F:		{str: 'EXT_F', descr: '', des: '',},
	FWEIGHT_A:	{str: 'FWEIGHT_A', descr: 'Peso na Balança A - Alimentação', des: 'Peso Bal Alim',},
	FWEIGHT_B:	{str: 'FWEIGHT_B', descr: '', des: '',},
	FWEIGHT_C:	{str: 'FWEIGHT_C', descr: '', des: '',},
	JTEMP:		{str: 'JTEMP', descr: 'Temperatura da Jaqueta Dágua', des: 'Temp Jaqueta',},
	N2SP_A:		{str: 'N2SP_A', descr: '', des: '',},
	N2SPT_A:	{str: 'N2SPT_A', descr: '', des: '',},
	O2SP_A:		{str: 'O2SP_A', descr: '', des: '',},
	OVT_B:		{str: 'OVT_B', descr: '', des: '',},
	pH:			{str: 'pH', descr: 'pH do Meio', des: 'ph Meio',},
	pH_A:		{str: 'pH_A', descr: '', des: '',},
	pO2:		{str: 'pO2', descr: 'Concentração de O2 dissolvido no meio', des: '[O2] do meio',},
	pO2_A:		{str: 'pO2_A', descr: '', des: '',},
	STIRR:		{str: 'STIRR', descr: 'Rotação das Aletas', des: 'Rotação Aletas',},
	SUBS_A:		{str: 'SUBS_A', descr: 'Bomba do Substrato A', des: 'Bomba Subs A',},
	SUBS_B:		{str: 'SUBS_B', descr: 'Bomba do Substrato B', des: 'Bomba Subs B',},
	SUBS_C:		{str: 'SUBS_C', descr: '', des: '',},
	SUBS_D:		{str: 'SUBS_D', descr: '', des: '',},
	SUBST_A:	{str: 'SUBST_A', descr: '', des: '',},
	SUBST_B:	{str: 'SUBST_B', descr: '', des: '',},
	SUBST_C:	{str: 'SUBST_C', descr: '', des: '',},
	SUBST_D:	{str: 'SUBST_D', descr: '', des: '',},
	TEMP:		{str: 'TEMP', descr: 'Temperatura do Meio', des: 'Temp Meio',},
	TURB:		{str: 'TURB', descr: 'Turbidez do Meio', des: 'Turbidez',},
	VWEIGHT_E:	{str: 'VWEIGHT_E', descr: 'Peso na Balança E - Dorna', des: 'Peso Dorna',},
};

// sao 9 prioridades (9 plotagens):
// a limitacao de 9 plotagens e' do zingchart
const FTagPrior = [ FTag.AIRSP_A, FTag.ExCO2, FTag.ExO2, FTag.EXT_E, FTag.pH,
				FTag.pO2, FTag.STIRR, FTag.TEMP, FTag.TURB ];

// 9 cores default:
const FTagColor = [ 'navy', 'red', 'blue', 'green', 'grey', 
					'orange', 'lime', 'fuchsia', 'purple' ];

// cores (com nome proprio - pode usar #xxxxxx):
// aqua, black, blue, fuchsia, gray, green, lime, marron, navy, olive, purple
// red, silver, teal, white, yellow
// http://www.javascripter.net/faq/colornam.htm

export {FTag, FTagPrior, FTagColor};
'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { searchLocalFoods, cuisineFlags, cuisineLabels, type LocalFood } from '@/lib/foodDatabase'

const translations = {
  fr: {
    title: 'Tracker de calories 50+',
    logout: 'Déconnexion',
    caloriesConsumed: 'Calories consommées',
    dailyGoal: 'Objectif journalier',
    remaining: 'Restant',
    currentWeight: 'Poids actuel',
    consumed: 'kcal consommés',
    goal: 'Objectif',
    exceeded: (n: number) => `⚠️ Objectif dépassé de ${n} kcal`,
    remainingToday: (n: number) => `✅ ${n} kcal restants aujourd'hui`,
    weightTracking: '⚖️ Suivi du poids',
    weightPlaceholder: "Votre poids aujourd'hui (kg)",
    save: 'Enregistrer',
    saving: '...',
    noWeightData: 'Aucune donnée sur cette période. Enregistrez votre poids pour voir la courbe !',
    weightLabel: 'Poids',
    usuals: '⚡ Mes habituels',
    addMeal: '➕ Ajouter un repas',
    mealNamePlaceholder: 'Nom du repas (ex: Poulet riz)',
    caloriesPlaceholder: 'Calories',
    protPlaceholder: 'Protéines (g)',
    glucPlaceholder: 'Glucides (g)',
    lipPlaceholder: 'Lipides (g)',
    add: 'Ajouter',
    adding: '...',
    todayMeals: '🍽️ Repas du jour',
    noMeals: "Aucun repas enregistré aujourd'hui.",
    noMealsHint: 'Ajoutez votre premier repas ci-dessus !',
    deletingIn: 'Suppression dans 3 secondes...',
    cancel: '↩️ Annuler',
    savEdit: '✅ Sauvegarder',
    cancelEdit: 'Annuler',
    calendar: '📅 Calendrier & Historique',
    days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    months: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    noDataDay: 'Aucune donnée pour ce jour.',
    mealsOfDay: 'Repas du',
    total: 'Total',
    closeDetail: 'Fermer',
    exportTitle: '📤 Exporter mes données (30 derniers jours)',
    exportCSV: '⬇️ Exporter CSV',
    exportPDF: '🖨️ Exporter PDF',
    searchPlaceholder: '🔍 Rechercher un aliment (ex: poulet, yaourt...)',
    searchButton: 'Rechercher',
    searching: 'Recherche...',
    searchResults: 'Résultats',
    searchNoResults: 'Aucun résultat. Essayez un autre terme.',
    searchError: 'Erreur de recherche. Réessayez.',
    searchPer100g: 'pour 100g',
    searchPreFill: '✙ Utiliser',
    searchTitle: "🔍 Recherche d'aliments",
    worldCuisines: '🌍 Cuisines du monde',
    localResults: 'Résultats locaux',
    offResults: 'Résultats Open Food Facts',
    filterAll: 'Tous',
    portion: 'Portion',
    macrosTitle: '🥩 Répartition Macros du jour',
    macrosNoData: 'Ajoutez des repas avec macros pour voir la répartition.',
    proteines: 'Protéines',
    glucides: 'Glucides',
    lipides: 'Lipides',
    macrosOptional: 'Macros (optionnel)',
    exceeded_macro: 'dépassé',
    of_goal: "de l'objectif",
    macroGoalsTitle: '🎯 Mes objectifs macros',
    macroGoalsSaved: '✅ Objectifs sauvegardés !',
    macroGoalsSaving: '...',
    macroGoalsSave: 'Sauvegarder',
    macroGoalsReset: '🔄 Réinitialiser les valeurs recommandées',
    macroGoalsHint: 'Modifiez vos objectifs selon votre évolution.',
  },
  en: {
    title: 'Calorie Tracker 50+',
    logout: 'Logout',
    caloriesConsumed: 'Calories consumed',
    dailyGoal: 'Daily goal',
    remaining: 'Remaining',
    currentWeight: 'Current weight',
    consumed: 'kcal consumed',
    goal: 'Goal',
    exceeded: (n: number) => `⚠️ Goal exceeded by ${n} kcal`,
    remainingToday: (n: number) => `✅ ${n} kcal remaining today`,
    weightTracking: '⚖️ Weight tracking',
    weightPlaceholder: "Today's weight (kg)",
    save: 'Save',
    saving: '...',
    noWeightData: 'No data for this period. Log your weight to see the curve!',
    weightLabel: 'Weight',
    usuals: '⚡ My usuals',
    addMeal: '➕ Add a meal',
    mealNamePlaceholder: 'Meal name (e.g. Chicken rice)',
    caloriesPlaceholder: 'Calories',
    protPlaceholder: 'Protein (g)',
    glucPlaceholder: 'Carbs (g)',
    lipPlaceholder: 'Fat (g)',
    add: 'Add',
    adding: '...',
    todayMeals: "🍽️ Today's meals",
    noMeals: 'No meals logged today.',
    noMealsHint: 'Add your first meal above!',
    deletingIn: 'Deleting in 3 seconds...',
    cancel: '↩️ Cancel',
    savEdit: '✅ Save',
    cancelEdit: 'Cancel',
    calendar: '📅 Calendar & History',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    noDataDay: 'No data for this day.',
    mealsOfDay: 'Meals of',
    total: 'Total',
    closeDetail: 'Close',
    exportTitle: '📤 Export my data (last 30 days)',
    exportCSV: '⬇️ Export CSV',
    exportPDF: '🖨️ Export PDF',
    searchPlaceholder: '🔍 Search a food (e.g. chicken, yogurt...)',
    searchButton: 'Search',
    searching: 'Searching...',
    searchResults: 'Results',
    searchNoResults: 'No results. Try another term.',
    searchError: 'Search error. Please retry.',
    searchPer100g: 'per 100g',
    searchPreFill: '✙ Use',
    searchTitle: '🔍 Food Search',
    worldCuisines: '🌍 World Cuisines',
    localResults: 'Local results',
    offResults: 'Open Food Facts results',
    filterAll: 'All',
    portion: 'Serving',
    macrosTitle: "🥩 Today's Macro Breakdown",
    macrosNoData: 'Add meals with macros to see the breakdown.',
    proteines: 'Protein',
    glucides: 'Carbs',
    lipides: 'Fat',
    macrosOptional: 'Macros (optional)',
    exceeded_macro: 'exceeded',
    of_goal: 'of goal',
    macroGoalsTitle: '🎯 My macro goals',
    macroGoalsSaved: '✅ Goals saved!',
    macroGoalsSaving: '...',
    macroGoalsSave: 'Save',
    macroGoalsReset: '🔄 Reset to recommended values',
    macroGoalsHint: 'Adjust your goals as you progress.',
  },
  es: {
    title: 'Rastreador de calorías 50+',
    logout: 'Cerrar sesión',
    caloriesConsumed: 'Calorías consumidas',
    dailyGoal: 'Objetivo diario',
    remaining: 'Restante',
    currentWeight: 'Peso actual',
    consumed: 'kcal consumidas',
    goal: 'Objetivo',
    exceeded: (n: number) => `⚠️ Objetivo superado por ${n} kcal`,
    remainingToday: (n: number) => `✅ ${n} kcal restantes hoy`,
    weightTracking: '⚖️ Seguimiento de peso',
    weightPlaceholder: 'Tu peso hoy (kg)',
    save: 'Guardar',
    saving: '...',
    noWeightData: '¡Sin datos en este período. Registra tu peso para ver la curva!',
    weightLabel: 'Peso',
    usuals: '⚡ Mis habituales',
    addMeal: '➕ Añadir comida',
    mealNamePlaceholder: 'Nombre de la comida (ej: Pollo arroz)',
    caloriesPlaceholder: 'Calorías',
    protPlaceholder: 'Proteínas (g)',
    glucPlaceholder: 'Carbohidratos (g)',
    lipPlaceholder: 'Grasas (g)',
    add: 'Añadir',
    adding: '...',
    todayMeals: '🍽️ Comidas de hoy',
    noMeals: 'No hay comidas registradas hoy.',
    noMealsHint: '¡Añade tu primera comida arriba!',
    deletingIn: 'Eliminando en 3 segundos...',
    cancel: '↩️ Cancelar',
    savEdit: '✅ Guardar',
    cancelEdit: 'Cancelar',
    calendar: '📅 Calendario & Historial',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    noDataDay: 'Sin datos para este día.',
    mealsOfDay: 'Comidas del',
    total: 'Total',
    closeDetail: 'Cerrar',
    exportTitle: '📤 Exportar mis datos (últimos 30 días)',
    exportCSV: '⬇️ Exportar CSV',
    exportPDF: '🖨️ Exportar PDF',
    searchPlaceholder: '🔍 Buscar un alimento (ej: pollo, yogur...)',
    searchButton: 'Buscar',
    searching: 'Buscando...',
    searchResults: 'Resultados',
    searchNoResults: 'Sin resultados. Prueba otro término.',
    searchError: 'Error de búsqueda. Inténtalo de nuevo.',
    searchPer100g: 'por 100g',
    searchPreFill: '✙ Usar',
    searchTitle: '🔍 Búsqueda de alimentos',
    worldCuisines: '🌍 Cocinas del mundo',
    localResults: 'Resultados locales',
    offResults: 'Resultados Open Food Facts',
    filterAll: 'Todos',
    portion: 'Porción',
    macrosTitle: '🥩 Distribución de Macros del día',
    macrosNoData: 'Añade comidas con macros para ver la distribución.',
    proteines: 'Proteínas',
    glucides: 'Carbohidratos',
    lipides: 'Grasas',
    macrosOptional: 'Macros (opcional)',
    exceeded_macro: 'superado',
    of_goal: 'del objetivo',
    macroGoalsTitle: '🎯 Mis objetivos de macros',
    macroGoalsSaved: '✅ ¡Objetivos guardados!',
    macroGoalsSaving: '...',
    macroGoalsSave: 'Guardar',
    macroGoalsReset: '🔄 Restablecer los valores recomendados',
    macroGoalsHint: 'Ajusta tus objetivos según tu evolución.',
  },
}

type Lang = 'fr' | 'en' | 'es'

interface Meal {
  id: string
  nom: string
  calories: number
  created_at: string
  date?: string
  proteines?: number
  glucides?: number
  lipides?: number
}

interface WeightLog {
  date: string
  poids: number
}

const CUISINE_ORDER: Array<LocalFood['cuisine'] | 'all'> = ['all', 'daily', 'us', 'ca', 'ma', 'fr', 'it', 'mx', 'jp']

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [meals, setMeals] = useState<Meal[]>([])
  const [nomRepas, setNomRepas] = useState('')
  const [caloriesRepas, setCaloriesRepas] = useState('')
  const [proteinesRepas, setProteinesRepas] = useState('')
  const [glucidesRepas, setGlucidesRepas] = useState('')
  const [lipidesRepas, setLipidesRepas] = useState('')
  const [adding, setAdding] = useState(false)
  const [habituels, setHabituels] = useState<{ nom: string; calories: number }[]>([])

  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const deleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNom, setEditNom] = useState('')
  const [editCalories, setEditCalories] = useState('')
  // ✅ NOUVEAU — états macros pour l'édition
  const [editProteines, setEditProteines] = useState('')
  const [editGlucides, setEditGlucides] = useState('')
  const [editLipides, setEditLipides] = useState('')

  const [dateStr, setDateStr] = useState('')
  const [lang, setLang] = useState<Lang>('fr')
  const langRef = useRef<Lang>('fr')

  const [newPoids, setNewPoids] = useState('')
  const [savingPoids, setSavingPoids] = useState(false)
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([])
  const [weightPeriod, setWeightPeriod] = useState<7 | 15 | 30>(7)

  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [calendarData, setCalendarData] = useState<Record<string, number>>({})
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedDayMeals, setSelectedDayMeals] = useState<Meal[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ name: string; calories: number; brand: string }[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [searchDone, setSearchDone] = useState(false)

  const [localFoodResults, setLocalFoodResults] = useState<LocalFood[]>([])
  const [cuisineFilter, setCuisineFilter] = useState<LocalFood['cuisine'] | 'all'>('all')

  const [editGoalProt, setEditGoalProt] = useState('')
  const [editGoalGluc, setEditGoalGluc] = useState('')
  const [editGoalLip,  setEditGoalLip]  = useState('')
  const [savingGoals,  setSavingGoals]  = useState(false)
  const [goalsSaved,   setGoalsSaved]   = useState(false)

  // ✅ NOUVEAU — objectif calorique modifiable
  const [editingTdee,   setEditingTdee]   = useState(false)
  const [editTdeeValue, setEditTdeeValue] = useState('')

  const t = translations[lang]

  useEffect(() => {
    const savedLang = localStorage.getItem('kalorix_lang') as Lang | null
    if (savedLang && ['fr', 'en', 'es'].includes(savedLang)) {
      setLang(savedLang)
      langRef.current = savedLang
    }
    setDateStr(new Date().toLocaleDateString(
      lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'fr-FR',
      { weekday: 'long', day: 'numeric', month: 'long' }
    ))
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      const { data: profileData, error } = await supabase
        .from('profiles').select('*').eq('id', session.user.id).single()
      if (error) console.error('Erreur profil:', error.message)
      if (!profileData || !profileData.tdee) { router.push('/tdee'); return }
      setProfile(profileData)
      setEditGoalProt(String(profileData.objectif_proteines ?? ''))
      setEditGoalGluc(String(profileData.objectif_glucides  ?? ''))
      setEditGoalLip( String(profileData.objectif_lipides   ?? ''))
      await fetchMeals(session.user.id)
      await fetchHabituels(session.user.id)
      await fetchWeightLogs(session.user.id, 7)
      await fetchCalendarData(session.user.id, new Date())
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    langRef.current = newLang
    localStorage.setItem('kalorix_lang', newLang)
    setDateStr(new Date().toLocaleDateString(
      newLang === 'en' ? 'en-GB' : newLang === 'es' ? 'es-ES' : 'fr-FR',
      { weekday: 'long', day: 'numeric', month: 'long' }
    ))
    if (searchQuery.trim().length >= 2) {
      setLocalFoodResults(searchLocalFoods(searchQuery, newLang))
    }
  }

  const fetchMeals = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('meals').select('*').eq('user_id', userId)
      .eq('date', today).order('created_at', { ascending: true })
    if (error) console.error('Erreur repas:', error.message)
    else setMeals(data ?? [])
  }

  const fetchHabituels = async (userId: string) => {
    const { data, error } = await supabase
      .from('meals').select('nom, calories').eq('user_id', userId)
    if (error) { console.error('Erreur habituels:', error.message); return }
    const counts: Record<string, { calories: number; count: number }> = {}
    for (const meal of data ?? []) {
      if (counts[meal.nom]) counts[meal.nom].count += 1
      else counts[meal.nom] = { calories: meal.calories, count: 1 }
    }
    const top5 = Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count).slice(0, 5)
      .map(([nom, val]) => ({ nom, calories: val.calories }))
    setHabituels(top5)
  }

  const fetchWeightLogs = async (userId: string, days: number = 7) => {
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - (days - 1))
    const fromDateStr = fromDate.toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('weight_logs').select('date, poids')
      .eq('user_id', userId).gte('date', fromDateStr)
      .order('date', { ascending: true })
    if (error) console.error('Erreur weight_logs:', error.message)
    else setWeightLogs(data ?? [])
  }

  const fetchCalendarData = async (userId: string, month: Date) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).toISOString().split('T')[0]
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('meals').select('date, calories')
      .eq('user_id', userId).gte('date', firstDay).lte('date', lastDay)
    if (error) { console.error('Erreur calendrier:', error.message); return }
    const totals: Record<string, number> = {}
    for (const meal of data ?? []) {
      totals[meal.date] = (totals[meal.date] || 0) + meal.calories
    }
    setCalendarData(totals)
  }

  const fetchDayMeals = async (userId: string, date: string) => {
    const { data, error } = await supabase
      .from('meals').select('*').eq('user_id', userId).eq('date', date)
      .order('created_at', { ascending: true })
    if (error) console.error('Erreur repas du jour:', error.message)
    else setSelectedDayMeals(data ?? [])
  }

  const handleDayClick = async (dateStr: string) => {
    if (selectedDay === dateStr) { setSelectedDay(null); return }
    setSelectedDay(dateStr)
    await fetchDayMeals(user.id, dateStr)
  }

  const handleMonthChange = async (delta: number) => {
    const newMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + delta, 1)
    setCalendarMonth(newMonth)
    setSelectedDay(null)
    await fetchCalendarData(user.id, newMonth)
  }

  const getDayColor = (dateKey: string) => {
    const total = calendarData[dateKey]
    const tdee = profile?.tdee ?? 2000
    if (total === undefined) return { bg: '#eeeeee', text: '#999' }
    if (total > tdee) return { bg: '#ff5252', text: 'white' }
    if (total > tdee * 0.85) return { bg: '#ffb300', text: 'white' }
    return { bg: '#00c853', text: 'white' }
  }

  const handleAddMeal = async () => {
    if (!nomRepas.trim() || !caloriesRepas) return
    setAdding(true)
    const insertData: any = {
      user_id: user.id,
      nom: nomRepas.trim(),
      calories: parseInt(caloriesRepas),
    }
    if (proteinesRepas) insertData.proteines = parseInt(proteinesRepas)
    if (glucidesRepas) insertData.glucides = parseInt(glucidesRepas)
    if (lipidesRepas) insertData.lipides = parseInt(lipidesRepas)
    const { error } = await supabase.from('meals').insert(insertData)
    if (error) console.error('Erreur ajout repas:', error.message)
    else {
      setNomRepas(''); setCaloriesRepas('')
      setProteinesRepas(''); setGlucidesRepas(''); setLipidesRepas('')
      await fetchMeals(user.id)
      await fetchHabituels(user.id)
      await fetchCalendarData(user.id, calendarMonth)
    }
    setAdding(false)
  }

  const handleAddHabituel = async (nom: string, calories: number) => {
    const { error } = await supabase.from('meals').insert({ user_id: user.id, nom, calories })
    if (!error) {
      await fetchMeals(user.id)
      await fetchHabituels(user.id)
      await fetchCalendarData(user.id, calendarMonth)
    }
  }

  const handleDeleteClick = (mealId: string) => {
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current)
    setPendingDelete(mealId)
    deleteTimerRef.current = setTimeout(async () => {
      const { error } = await supabase.from('meals').delete().eq('id', mealId)
      if (!error) {
        await fetchMeals(user.id)
        await fetchCalendarData(user.id, calendarMonth)
      }
      setPendingDelete(null)
    }, 3000)
  }

  const handleCancelDelete = () => {
    if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current)
    setPendingDelete(null)
  }

  // ✅ MODIFIÉ — pré-remplit aussi les macros
  const handleEditClick = (meal: Meal) => {
    setEditingId(meal.id)
    setEditNom(meal.nom)
    setEditCalories(String(meal.calories))
    setEditProteines(meal.proteines ? String(meal.proteines) : '')
    setEditGlucides(meal.glucides ? String(meal.glucides) : '')
    setEditLipides(meal.lipides ? String(meal.lipides) : '')
  }

  // ✅ MODIFIÉ — sauvegarde aussi les macros
  const handleSaveEdit = async () => {
    if (!editNom.trim() || !editCalories) return
    const updateData: any = {
      nom: editNom.trim(),
      calories: parseInt(editCalories),
      proteines: editProteines ? parseInt(editProteines) : null,
      glucides:  editGlucides  ? parseInt(editGlucides)  : null,
      lipides:   editLipides   ? parseInt(editLipides)   : null,
    }
    const { error } = await supabase.from('meals').update(updateData).eq('id', editingId)
    if (!error) { await fetchMeals(user.id); await fetchHabituels(user.id) }
    setEditingId(null)
    setEditProteines(''); setEditGlucides(''); setEditLipides('')
  }

  // ✅ MODIFIÉ — reset aussi les macros
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditProteines(''); setEditGlucides(''); setEditLipides('')
  }

  const handleSaveGoals = async () => {
    if (!editGoalProt || !editGoalGluc || !editGoalLip) return
    setSavingGoals(true)
    setGoalsSaved(false)
    const newProt = parseInt(editGoalProt)
    const newGluc = parseInt(editGoalGluc)
    const newLip  = parseInt(editGoalLip)
    const { error } = await supabase.from('profiles').update({
      objectif_proteines: newProt,
      objectif_glucides:  newGluc,
      objectif_lipides:   newLip,
    }).eq('id', user.id)
    if (!error) {
      setProfile((prev: any) => ({
        ...prev,
        objectif_proteines: newProt,
        objectif_glucides:  newGluc,
        objectif_lipides:   newLip,
      }))
      setGoalsSaved(true)
      setTimeout(() => setGoalsSaved(false), 3000)
    }
    setSavingGoals(false)
  }

  const handleResetGoals = () => {
    if (!profile?.tdee || !profile?.poids) return
    const prot = Math.round(profile.poids * 2)
    const lip  = Math.round((profile.tdee * 0.25) / 9)
    const gluc = Math.round((profile.tdee - prot * 4 - lip * 9) / 4)
    setEditGoalProt(String(prot))
    setEditGoalGluc(String(gluc))
    setEditGoalLip(String(lip))
  }

  // ✅ NOUVEAU — sauvegarde TDEE modifié depuis le dashboard
  const handleSaveTdee = async () => {
    const val = parseInt(editTdeeValue)
    if (!val || val < 500 || val > 10000) return
    const { error } = await supabase.from('profiles').update({ tdee: val }).eq('id', user.id)
    if (!error) {
      setProfile((prev: any) => ({ ...prev, tdee: val }))
      setEditingTdee(false)
    }
  }

  const handleSearchQueryChange = (val: string) => {
    setSearchQuery(val)
    setSearchDone(false)
    setSearchResults([])
    if (val.trim().length >= 2) {
      setLocalFoodResults(searchLocalFoods(val, langRef.current))
    } else {
      setLocalFoodResults([])
    }
  }

  const handleFoodSearch = async () => {
    if (!searchQuery.trim()) return
    setLocalFoodResults(searchLocalFoods(searchQuery, langRef.current))
    setSearching(true)
    setSearchError('')
    setSearchResults([])
    setSearchDone(false)
    const MAX_RETRIES = 3
    const TIMEOUT_MS = 8000
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
        const res = await fetch(`/api/food-search?q=${encodeURIComponent(searchQuery)}`, { signal: controller.signal })
        clearTimeout(timeoutId)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Search failed')
        setSearchResults(data.results ?? [])
        setSearchDone(true)
        setSearching(false)
        return
      } catch {
        if (attempt === MAX_RETRIES) { setSearchError(t.searchError); setSearching(false) }
      }
    }
  }

  const handleUseFood = (name: string, calories: number) => {
    setNomRepas(name); setCaloriesRepas(String(calories))
    setProteinesRepas(''); setGlucidesRepas(''); setLipidesRepas('')
    setSearchResults([]); setLocalFoodResults([])
    setSearchQuery(''); setSearchDone(false)
  }

  const handleUseLocalFood = (food: LocalFood) => {
    setNomRepas(food.name[langRef.current])
    setCaloriesRepas(String(food.calories))
    setProteinesRepas(food.proteines ? String(food.proteines) : '')
    setGlucidesRepas(food.glucides ? String(food.glucides) : '')
    setLipidesRepas(food.lipides ? String(food.lipides) : '')
    setSearchResults([]); setLocalFoodResults([])
    setSearchQuery(''); setSearchDone(false); setCuisineFilter('all')
  }

  const handleSavePoids = async () => {
    if (!newPoids || isNaN(parseFloat(newPoids))) return
    setSavingPoids(true)
    const poidsNum = parseFloat(newPoids)
    const today = new Date().toISOString().split('T')[0]
    const { error: profileError } = await supabase.from('profiles').update({ poids: poidsNum }).eq('id', user.id)
    if (profileError) console.error('Erreur mise à jour profil:', profileError.message)
    else setProfile((prev: any) => ({ ...prev, poids: poidsNum }))
    const { error: logError } = await supabase.from('weight_logs')
      .upsert({ user_id: user.id, poids: poidsNum, date: today }, { onConflict: 'user_id,date' })
    if (logError) console.error('Erreur weight_logs:', logError.message)
    else { await fetchWeightLogs(user.id, weightPeriod); setNewPoids('') }
    setSavingPoids(false)
  }

  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/login') }

  const handleExportCSV = async () => {
    const from = new Date(); from.setDate(from.getDate() - 29)
    const fromStr = from.toISOString().split('T')[0]
    const { data: mealData } = await supabase.from('meals').select('date, nom, calories').eq('user_id', user.id).gte('date', fromStr).order('date', { ascending: true })
    const { data: weightData } = await supabase.from('weight_logs').select('date, poids').eq('user_id', user.id).gte('date', fromStr).order('date', { ascending: true })
    let csv = 'Type,Date,Nom,Valeur\n'
    for (const m of mealData ?? []) csv += `Repas,${m.date},"${m.nom}",${m.calories} kcal\n`
    for (const w of weightData ?? []) csv += `Poids,${w.date},,${w.poids} kg\n`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `kalorix_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  const handleExportPDF = async () => {
    const from = new Date(); from.setDate(from.getDate() - 29)
    const fromStr = from.toISOString().split('T')[0]
    const { data: mealData } = await supabase.from('meals').select('date, nom, calories').eq('user_id', user.id).gte('date', fromStr).order('date', { ascending: true })
    const { data: weightData } = await supabase.from('weight_logs').select('date, poids').eq('user_id', user.id).gte('date', fromStr).order('date', { ascending: true })
    const byDate: Record<string, { nom: string; calories: number }[]> = {}
    for (const m of mealData ?? []) { if (!byDate[m.date]) byDate[m.date] = []; byDate[m.date].push({ nom: m.nom, calories: m.calories }) }
    const weightByDate: Record<string, number> = {}
    for (const w of weightData ?? []) weightByDate[w.date] = w.poids
    const currentLang = langRef.current
    const locale = currentLang === 'en' ? 'en-GB' : currentLang === 'es' ? 'es-ES' : 'fr-FR'
    const pdfTitles: Record<Lang, { title: string; subtitle: (date: string, goal: number) => string; weight: string }> = {
      fr: { title: '🥗 Kalorix — Export 30 jours', subtitle: (date, goal) => `Généré le ${date} · Objectif : ${goal} kcal/jour`, weight: '⚖️ Poids' },
      en: { title: '🥗 Kalorix — 30-day Export', subtitle: (date, goal) => `Generated on ${date} · Goal: ${goal} kcal/day`, weight: '⚖️ Weight' },
      es: { title: '🥗 Kalorix — Exportación 30 días', subtitle: (date, goal) => `Generado el ${date} · Objetivo: ${goal} kcal/día`, weight: '⚖️ Peso' },
    }
    const pdf = pdfTitles[currentLang]
    const generatedDate = new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    const dates = [...new Set([...Object.keys(byDate), ...Object.keys(weightByDate)])].sort()
    let html = `<html><head><meta charset="utf-8"><style>body{font-family:'Segoe UI',sans-serif;padding:30px;color:#333}h1{color:#667eea;text-align:center}h2{color:#764ba2;font-size:1em;margin:16px 0 6px;border-bottom:1px solid #e0e0e0;padding-bottom:4px}.meal{display:flex;justify-content:space-between;padding:4px 8px;background:#f8f9ff;border-radius:6px;margin-bottom:4px;font-size:.9em}.weight{color:#667eea;font-weight:bold;font-size:.9em;margin-bottom:4px}.total{display:flex;justify-content:space-between;padding:4px 8px;background:#667eea;color:white;border-radius:6px;font-weight:bold;font-size:.9em}.subtitle{text-align:center;color:#999;font-size:.85em;margin-bottom:30px}</style></head><body><h1>${pdf.title}</h1><p class="subtitle">${pdf.subtitle(generatedDate, tdee)}</p>`
    for (const date of dates) {
      const dateLabel = new Date(date + 'T12:00:00').toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
      html += `<h2>${dateLabel}</h2>`
      if (weightByDate[date]) html += `<div class="weight">${pdf.weight} : ${weightByDate[date]} kg</div>`
      const dayMeals = byDate[date] ?? []
      for (const m of dayMeals) html += `<div class="meal"><span>${m.nom}</span><span>${m.calories} kcal</span></div>`
      if (dayMeals.length > 0) {
        const total = dayMeals.reduce((s, m) => s + m.calories, 0)
        html += `<div class="total"><span>${translations[currentLang].total}</span><span>${total} kcal</span></div>`
      }
    }
    html += '</body></html>'
    const win = window.open('', '_blank')
    if (win) { win.document.write(html); win.document.close(); win.print() }
  }

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0)
  const tdee = profile?.tdee ?? 2000
  const progress = Math.min((totalCalories / tdee) * 100, 100)
  const remaining = Math.max(tdee - totalCalories, 0)
  const progressColor = totalCalories > tdee ? '#ff6b6b' : totalCalories > tdee * 0.85 ? '#ffc107' : '#667eea'

  const totalProteines = meals.reduce((s, m) => s + (m.proteines ?? 0), 0)
  const totalGlucides  = meals.reduce((s, m) => s + (m.glucides  ?? 0), 0)
  const totalLipides   = meals.reduce((s, m) => s + (m.lipides   ?? 0), 0)
  const hasMacros = totalProteines + totalGlucides + totalLipides > 0

  const goalProteines = profile?.objectif_proteines ?? null
  const goalGlucides  = profile?.objectif_glucides  ?? null
  const goalLipides   = profile?.objectif_lipides   ?? null
  const hasGoals = goalProteines !== null && goalGlucides !== null && goalLipides !== null

  const macroData = [
    { name: t.proteines, value: totalProteines, goal: goalProteines, color: '#667eea' },
    { name: t.glucides,  value: totalGlucides,  goal: goalGlucides,  color: '#f093fb' },
    { name: t.lipides,   value: totalLipides,   goal: goalLipides,   color: '#43e97b' },
  ]

  const filteredLocalResults = cuisineFilter === 'all'
    ? localFoodResults
    : localFoodResults.filter(f => f.cuisine === cuisineFilter)

  const cuisinesInResults = localFoodResults.length > 0
    ? (['all', ...new Set(localFoodResults.map(f => f.cuisine))] as Array<LocalFood['cuisine'] | 'all'>)
    : CUISINE_ORDER

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const today = new Date().toISOString().split('T')[0]
    let startDow = firstDayOfMonth.getDay() - 1
    if (startDow < 0) startDow = 6
    const cells: (number | null)[] = []
    for (let i = 0; i < startDow; i++) cells.push(null)
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    return cells.map((day, idx) => {
      if (!day) return <div key={idx} />
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const colors = getDayColor(dateKey)
      const isToday = dateKey === today
      const isSelected = dateKey === selectedDay
      const total = calendarData[dateKey]
      return (
        <div key={idx} onClick={() => handleDayClick(dateKey)}
          style={{ background: isSelected ? '#667eea' : colors.bg, borderRadius: 10, padding: '10px 4px', textAlign: 'center', cursor: 'pointer', border: isToday ? '2px solid #667eea' : '2px solid transparent', transition: 'all 0.2s', minHeight: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontWeight: isToday ? 'bold' : 'normal', fontSize: 16, color: isSelected ? 'white' : '#333' }}>{day}</span>
          {total !== undefined && <span style={{ fontSize: 12, color: isSelected ? 'white' : colors.text, fontWeight: 'bold' }}>{total}</span>}
        </div>
      )
    })
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: '1.1em', opacity: 0.9 }}>Chargement...</p>
        </div>
      </div>
    )
  }

  const cardStyle: React.CSSProperties = {
    background: 'white', borderRadius: 20, padding: 28, marginBottom: 20,
    boxShadow: '0 8px 30px rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.08)',
  }
  const inputStyle: React.CSSProperties = {
    padding: '13px 18px', border: '2px solid #ede9f8', borderRadius: 12, fontSize: 15,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", outline: 'none',
    width: '100%', transition: 'all 0.25s', background: '#fafbff',
  }
  const btnPrimaryStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white', border: 'none', padding: '13px 26px', borderRadius: 12,
    fontWeight: '700', cursor: 'pointer', fontSize: 15, letterSpacing: '0.3px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.25s',
    boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
  }

  const langOptions: { code: Lang; flag: string; label: string }[] = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ]
  const periodLabel = (d: number) => lang === 'fr' ? `${d}j` : `${d}d`

  return (
    <div suppressHydrationWarning style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1a1040 0%, #3b2d8f 45%, #764ba2 100%)', padding: '30px 16px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ maxWidth: 820, margin: '0 auto', background: '#fafbff', borderRadius: 28, boxShadow: '0 32px 80px rgba(60,30,120,0.4)', padding: 0, overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px 30px 26px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative' }}>
            <h1 style={{ color: 'white', fontSize: '3em', fontWeight: '800', margin: 0, letterSpacing: '-1px', textShadow: '0 3px 16px rgba(0,0,0,0.25)' }}>🥗 Kalorix</h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88em', margin: '8px 0 0', letterSpacing: '0.3px' }}>{t.title} · {dateStr}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
            {langOptions.map(({ code, flag, label }) => (
              <button key={code} onClick={() => handleLangChange(code)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.25s', background: lang === code ? 'white' : 'rgba(255,255,255,0.18)', color: lang === code ? '#667eea' : 'white', boxShadow: lang === code ? '0 4px 12px rgba(0,0,0,0.2)' : 'none', transform: lang === code ? 'scale(1.05)' : 'scale(1)' }}>
                <span style={{ fontSize: 15 }}>{flag}</span><span>{label}</span>
              </button>
            ))}
            <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.25)', margin: '0 2px' }} />
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '7px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
              {t.logout}
            </button>
          </div>
        </div>

        <div style={{ padding: '28px 30px 0' }}>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: t.caloriesConsumed, value: totalCalories, unit: 'kcal', icon: '🔥', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
              { label: t.dailyGoal, value: tdee, unit: 'kcal', icon: '🎯', bg: 'linear-gradient(135deg, #764ba2 0%, #a855f7 100%)' },
              { label: t.remaining, value: remaining, unit: 'kcal', icon: '⚡', bg: remaining < 0 ? 'linear-gradient(135deg, #ff6b6b 0%, #ee0979 100%)' : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
              { label: t.currentWeight, value: profile?.poids ?? '-', unit: 'kg', icon: '⚖️', bg: 'linear-gradient(135deg, #f093fb 0%, #667eea 100%)' },
            ].map((s) => (
              <div key={s.label} style={{ background: s.bg, color: 'white', padding: '22px 18px', borderRadius: 20, textAlign: 'center', boxShadow: '0 8px 24px rgba(102,126,234,0.25)', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '1.8em', marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: '0.78em', opacity: 0.88, marginBottom: 4, fontWeight: '500' }}>{s.label}</div>
                <div style={{ fontSize: '2.1em', fontWeight: '800', letterSpacing: '-1px' }}>{s.value}</div>
                <div style={{ fontSize: '0.78em', opacity: 0.8, marginTop: 2 }}>{s.unit}</div>
              </div>
            ))}
          </div>

          {/* Barre de progression */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 'bold', color: '#667eea', fontSize: '1.1em' }}>{totalCalories} {t.consumed}</span>
              <span style={{ color: '#764ba2', fontWeight: 'bold', fontSize: '1.1em' }}>{t.goal} : {tdee} kcal</span>
            </div>
            <div style={{ width: '100%', height: 30, background: '#f0f0f0', borderRadius: 15, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${progressColor} 0%, #764ba2 100%)`, transition: 'width 0.5s', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, color: 'white', fontWeight: 'bold', fontSize: '0.9em' }}>
                {progress > 10 ? `${Math.round(progress)}%` : ''}
              </div>
            </div>
            <div style={{ marginTop: 12, padding: 10, borderRadius: 10, textAlign: 'center', background: totalCalories > tdee ? '#ffebee' : '#e8f5e9', color: totalCalories > tdee ? '#c62828' : '#2e7d32', fontWeight: 500, fontSize: '0.95em' }}>
              {totalCalories > tdee ? t.exceeded(totalCalories - tdee) : t.remainingToday(remaining)}
            </div>

            {/* ✏️ NOUVEAU — Objectif calorique modifiable */}
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
              {editingTdee ? (
                <>
                  <input
                    type="number"
                    value={editTdeeValue}
                    onChange={(e) => setEditTdeeValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveTdee()}
                    min={500} max={10000}
                    autoFocus
                    style={{ width: 110, padding: '6px 10px', borderRadius: 8, border: '2px solid #667eea', fontSize: '0.95em', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", outline: 'none', textAlign: 'center' }}
                  />
                  <span style={{ color: '#999', fontSize: '0.85em' }}>kcal</span>
                  <button onClick={handleSaveTdee}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                    ✅
                  </button>
                  <button onClick={() => setEditingTdee(false)}
                    style={{ background: '#e0e0e0', color: '#666', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                    ✕
                  </button>
                </>
              ) : (
                <button onClick={() => { setEditTdeeValue(String(tdee)); setEditingTdee(true) }}
                  style={{ background: 'linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%)', border: '2px solid #667eea', color: '#667eea', padding: '8px 18px', borderRadius: 10, cursor: 'pointer', fontSize: '0.95em', fontWeight: '700', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; (e.currentTarget as HTMLButtonElement).style.color = 'white' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%)'; (e.currentTarget as HTMLButtonElement).style.color = '#667eea' }}>
                  ✏️ {lang === 'en' ? 'Edit goal' : lang === 'es' ? 'Editar objetivo' : "Modifier l'objectif"}
                </button>
              )}
            </div>
          </div>

          {/* MACROS PIECHART */}
          <div style={cardStyle}>
            <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>{t.macrosTitle}</h2>
            {hasMacros ? (
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <ResponsiveContainer width={220} height={220}>
                  <PieChart>
                    <Pie data={macroData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                      {macroData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${Number(value)} g`]} contentStyle={{ backgroundColor: 'white', border: '1px solid #667eea', borderRadius: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1, minWidth: 160 }}>
                  {macroData.map((m) => {
                    const totalMacros = totalProteines + totalGlucides + totalLipides
                    const pct = totalMacros > 0 ? Math.round((m.value / totalMacros) * 100) : 0
                    const barWidth = m.goal ? Math.min(Math.round((m.value / m.goal) * 100), 100) : pct
                    const overGoal = m.goal !== null && m.value > m.goal
                    const barColor = overGoal ? '#ff6b6b' : m.color
                    return (
                      <div key={m.name} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                            <span style={{ fontWeight: '600', color: '#333', fontSize: '0.95em' }}>{m.name}</span>
                          </div>
                          <span style={{ fontWeight: 'bold', color: overGoal ? '#ff6b6b' : m.color, fontSize: '0.9em' }}>
                            {m.goal !== null ? `${m.value} g / ${m.goal} g` : `${m.value} g`}
                          </span>
                        </div>
                        <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${barWidth}%`, background: barColor, borderRadius: 4, transition: 'width 0.5s' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                          <span style={{ fontSize: '0.72em', color: '#bbb' }}>{pct}%</span>
                          {m.goal !== null && (
                            <span style={{ fontSize: '0.72em', color: overGoal ? '#ff6b6b' : '#bbb' }}>
                              {overGoal ? `+${m.value - m.goal} g ${t.exceeded_macro}` : `${barWidth}% ${t.of_goal}`}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div style={{ marginTop: 4, padding: '10px 14px', background: '#f0f3ff', borderRadius: 10, fontSize: '1em', fontWeight: '700', color: '#444', textAlign: 'center' }}>
                    Total : {totalProteines + totalGlucides + totalLipides} g
                    {hasGoals && <span style={{ color: '#764ba2', marginLeft: 6 }}>/ {(goalProteines ?? 0) + (goalGlucides ?? 0) + (goalLipides ?? 0)} g {t.goal.toLowerCase()}</span>}
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: '#aaa', fontSize: '0.95em', textAlign: 'center', padding: '20px 0' }}>{t.macrosNoData}</p>
            )}
          </div>

          {/* OBJECTIFS MACROS MODIFIABLES */}
          <div style={cardStyle}>
            <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 6 }}>{t.macroGoalsTitle}</h2>
            <p style={{ color: '#aaa', fontSize: '0.85em', marginBottom: 18 }}>{t.macroGoalsHint}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              {[
                { emoji: '🥩', label: t.proteines, color: '#667eea', val: editGoalProt, set: setEditGoalProt },
                { emoji: '🌾', label: t.glucides,  color: '#f093fb', val: editGoalGluc, set: setEditGoalGluc },
                { emoji: '🫒', label: t.lipides,   color: '#43e97b', val: editGoalLip,  set: setEditGoalLip  },
              ].map(({ emoji, label, color, val, set }) => (
                <div key={label} style={{ flex: 1, minWidth: 110 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: '700', color }}>{label}</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number" min="0" max="500"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      onFocus={e => e.target.style.borderColor = color}
                      onBlur={e => e.target.style.borderColor = '#ede9f8'}
                      style={{ ...inputStyle, textAlign: 'center', paddingRight: 30 }}
                    />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#aaa', pointerEvents: 'none' }}>g</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={handleSaveGoals} disabled={savingGoals}
                style={{ ...btnPrimaryStyle, flex: 1, textAlign: 'center', opacity: savingGoals ? 0.6 : 1 }}>
                {goalsSaved ? t.macroGoalsSaved : savingGoals ? t.macroGoalsSaving : t.macroGoalsSave}
              </button>
              <button onClick={handleResetGoals}
                style={{ flex: 1, padding: '13px 16px', borderRadius: 12, border: '2px solid #ede9f8', background: '#fafbff', color: '#667eea', fontWeight: '600', fontSize: 14, cursor: 'pointer', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f0f3ff'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#667eea' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fafbff'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#ede9f8' }}>
                {t.macroGoalsReset}
              </button>
            </div>
          </div>

          {/* Calendrier & Historique */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', margin: 0 }}>{t.calendar}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => handleMonthChange(-1)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◀</button>
                <span style={{ fontWeight: 'bold', color: '#333', minWidth: 120, textAlign: 'center' }}>{t.months[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}</span>
                <button onClick={() => handleMonthChange(1)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
              {[{ color: '#e8f5e9', label: '🟢 OK' }, { color: '#fff8e1', label: '🟡 > 85%' }, { color: '#ffebee', label: '🔴 Dépassé' }, { color: '#f5f5f5', label: '⚪ Vide' }].map((l) => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: l.color, border: '1px solid #ddd' }} />
                  <span style={{ fontSize: 12, color: '#666' }}>{l.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
              {t.days.map((d) => (<div key={d} style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#999', padding: '6px 0' }}>{d}</div>))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>{renderCalendar()}</div>
            {selectedDay && (
              <div style={{ marginTop: 16, padding: 16, background: '#f8f9ff', borderRadius: 12, border: '2px solid #667eea' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, color: '#667eea', fontSize: '1em' }}>
                    {t.mealsOfDay} {new Date(selectedDay + 'T12:00:00').toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>
                  <button onClick={() => setSelectedDay(null)} style={{ background: '#e0e0e0', border: 'none', borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>{t.closeDetail}</button>
                </div>
                {selectedDayMeals.length === 0 ? (
                  <p style={{ color: '#999', fontSize: '0.9em', margin: 0 }}>{t.noDataDay}</p>
                ) : (
                  <>
                    {selectedDayMeals.map((meal) => (
                      <div key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'white', borderRadius: 8, marginBottom: 6, border: '1px solid #e0e0e0' }}>
                        <span style={{ color: '#333' }}>{meal.nom}</span>
                        <span style={{ color: '#667eea', fontWeight: 'bold' }}>{meal.calories} kcal</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, marginTop: 4 }}>
                      <span style={{ color: 'white', fontWeight: 'bold' }}>{t.total}</span>
                      <span style={{ color: 'white', fontWeight: 'bold' }}>{selectedDayMeals.reduce((s, m) => s + m.calories, 0)} kcal</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Suivi du poids */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', margin: 0 }}>{t.weightTracking}</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {([7, 15, 30] as const).map((d) => (
                  <button key={d} onClick={() => { setWeightPeriod(d); fetchWeightLogs(user.id, d) }}
                    style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.2s', background: weightPeriod === d ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0', color: weightPeriod === d ? 'white' : '#666' }}>
                    {periodLabel(d)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <input type="number" step="0.1" placeholder={t.weightPlaceholder} value={newPoids}
                onChange={(e) => setNewPoids(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSavePoids()}
                onFocus={e => e.target.style.borderColor = '#667eea'} onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                style={{ ...inputStyle, flex: 1, minWidth: 180 }} />
              <button onClick={handleSavePoids} disabled={savingPoids} style={{ ...btnPrimaryStyle, opacity: savingPoids ? 0.6 : 1 }}>
                {savingPoids ? t.saving : t.save}
              </button>
            </div>
            {weightLogs.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weightLogs} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tick={{ fill: '#999', fontSize: 12 }} tickFormatter={(val) => new Date(val).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'fr-FR', { day: 'numeric', month: 'short' })} />
                  <YAxis tick={{ fill: '#999', fontSize: 12 }} domain={['auto', 'auto']} unit=" kg" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #667eea', borderRadius: 12, color: '#333' }}
                    labelFormatter={(val) => new Date(val).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    formatter={(value) => [`${value} kg`, t.weightLabel]} />
                  <Line type="monotone" dataKey="poids" stroke="#667eea" strokeWidth={3} dot={{ fill: '#667eea', r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: '#999', fontSize: '0.9em', textAlign: 'center', padding: 20 }}>{t.noWeightData}</p>
            )}
          </div>

          {/* Mes habituels */}
          {habituels.length > 0 && (
            <div style={cardStyle}>
              <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>{t.usuals}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {habituels.map((h) => (
                  <button key={h.nom} onClick={() => handleAddHabituel(h.nom, h.calories)}
                    style={{ background: '#f8f9ff', border: '2px solid #667eea', color: '#667eea', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 'bold', fontSize: 14, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; (e.currentTarget as HTMLButtonElement).style.color = 'white' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8f9ff'; (e.currentTarget as HTMLButtonElement).style.color = '#667eea' }}>
                    {h.nom} · {h.calories} kcal
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Export PDF / CSV */}
          <div style={cardStyle}>
            <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>{t.exportTitle}</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleExportCSV} style={{ ...btnPrimaryStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', flex: 1, minWidth: 140, textAlign: 'center' }}>{t.exportCSV}</button>
              <button onClick={handleExportPDF} style={{ ...btnPrimaryStyle, flex: 1, minWidth: 140, textAlign: 'center' }}>{t.exportPDF}</button>
            </div>
          </div>

          {/* Recherche d'aliments */}
          <div style={cardStyle}>
            <h2 style={{ color: '#667eea', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>{t.searchTitle}</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFoodSearch()}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#ede9f8'}
                style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
              <button onClick={handleFoodSearch} disabled={searching} style={{ ...btnPrimaryStyle, opacity: searching ? 0.6 : 1 }}>
                {searching ? t.searching : t.searchButton}
              </button>
            </div>
            {localFoodResults.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: '0.78em', fontWeight: '700', color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '3px 10px', borderRadius: 20 }}>⚡ {t.localResults}</span>
                  <span style={{ fontSize: '0.8em', color: '#aaa' }}>{localFoodResults.length} résultat{localFoodResults.length > 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {cuisinesInResults.map((c) => {
                    const isActive = cuisineFilter === c
                    const flag = c === 'all' ? '🌍' : cuisineFlags[c]
                    const label = c === 'all' ? t.filterAll : cuisineLabels[c][lang]
                    return (
                      <button key={c} onClick={() => setCuisineFilter(c)}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: isActive ? '700' : '500', background: isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f8', color: isActive ? 'white' : '#555', transition: 'all 0.2s', boxShadow: isActive ? '0 2px 8px rgba(102,126,234,0.4)' : 'none' }}>
                        <span>{flag}</span><span>{label}</span>
                      </button>
                    )
                  })}
                </div>
                {filteredLocalResults.map((food) => (
                  <div key={food.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f0f3ff', borderRadius: 10, border: '1px solid #dde3f8', marginBottom: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 16 }}>{cuisineFlags[food.cuisine]}</span>
                        <span style={{ fontWeight: 'bold', color: '#333', fontSize: '0.95em' }}>{food.name[lang]}</span>
                      </div>
                      <div style={{ color: '#888', fontSize: '0.78em' }}>
                        {t.portion} : {food.portion[lang]}
                        {food.proteines && <span style={{ marginLeft: 8, color: '#667eea' }}>P:{food.proteines}g G:{food.glucides}g L:{food.lipides}g</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 10, flexShrink: 0 }}>
                      <span style={{ color: '#764ba2', fontWeight: 'bold', fontSize: '0.95em' }}>{food.calories} kcal</span>
                      <button onClick={() => handleUseLocalFood(food)} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", whiteSpace: 'nowrap' }}>
                        {t.searchPreFill}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(searchResults.length > 0 || searchError || (searchDone && !searching)) && (
              <div>
                {searchResults.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: '0.78em', fontWeight: '700', color: '#555', background: '#f0f0f0', padding: '3px 10px', borderRadius: 20 }}>🌐 {t.offResults}</span>
                    <span style={{ fontSize: '0.8em', color: '#aaa' }}>{searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}</span>
                  </div>
                )}
                {searchError && <p style={{ color: '#e53935', fontSize: '0.9em', margin: '8px 0' }}>{searchError}</p>}
                {searchDone && searchResults.length === 0 && !searchError && <p style={{ color: '#999', fontSize: '0.9em', margin: '8px 0' }}>{t.searchNoResults}</p>}
                {searchResults.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8f9ff', borderRadius: 10, border: '1px solid #e8e0f8', marginBottom: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.95em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                      {item.brand && <div style={{ color: '#999', fontSize: '0.8em' }}>{item.brand}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 10, flexShrink: 0 }}>
                      <span style={{ color: '#764ba2', fontWeight: 'bold', fontSize: '0.95em' }}>{item.calories} kcal <span style={{ color: '#aaa', fontWeight: 'normal', fontSize: '0.8em' }}>{t.searchPer100g}</span></span>
                      <button onClick={() => handleUseFood(item.name, item.calories)} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 13, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", whiteSpace: 'nowrap' }}>
                        {t.searchPreFill}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulaire ajout repas */}
          <div style={cardStyle}>
            <h2 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>{t.addMeal}</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
              <input type="text" placeholder={t.mealNamePlaceholder} value={nomRepas}
                onChange={(e) => setNomRepas(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddMeal()}
                onFocus={e => e.target.style.borderColor = '#667eea'} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                style={{ ...inputStyle, flex: 2, minWidth: 180 }} />
              <input type="number" placeholder={t.caloriesPlaceholder} value={caloriesRepas}
                onChange={(e) => setCaloriesRepas(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddMeal()}
                onFocus={e => e.target.style.borderColor = '#667eea'} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                style={{ ...inputStyle, width: 130 }} />
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              {[
                { emoji: '🥩', label: t.proteines, color: '#667eea', val: proteinesRepas, set: setProteinesRepas },
                { emoji: '🌾', label: t.glucides,  color: '#f093fb', val: glucidesRepas,  set: setGlucidesRepas },
                { emoji: '🫒', label: t.lipides,   color: '#43e97b', val: lipidesRepas,   set: setLipidesRepas  },
              ].map(({ emoji, label, color, val, set }) => (
                <div key={label} style={{ flex: 1, minWidth: 110 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 22 }}>{emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: '700', color }}>{label}</span>
                  </div>
                  <input type="number" placeholder="g" value={val} onChange={(e) => set(e.target.value)}
                    onFocus={e => e.target.style.borderColor = color} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                    style={{ ...inputStyle, textAlign: 'center' }} />
                </div>
              ))}
            </div>
            <button onClick={handleAddMeal} disabled={adding} style={{ ...btnPrimaryStyle, width: '100%', opacity: adding ? 0.6 : 1 }}>
              {adding ? t.adding : t.add}
            </button>
          </div>

          {/* Liste repas du jour */}
          <div style={{ ...cardStyle, marginBottom: 30 }}>
            <h2 style={{ color: '#333', fontWeight: 'bold', fontSize: '1.2em', marginBottom: 15 }}>
              {t.todayMeals}
              <span style={{ background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: '0.75em', marginLeft: 8 }}>{meals.length}</span>
            </h2>
            {meals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
                <div style={{ fontSize: '3em', marginBottom: 10 }}>🍽️</div>
                <p>{t.noMeals}</p>
                <p style={{ fontSize: '0.85em', marginTop: 5 }}>{t.noMealsHint}</p>
              </div>
            ) : (
              <div>
                {meals.map((meal) => (
                  <div key={meal.id} style={{ marginBottom: 8 }}>
                    {editingId === meal.id ? (
                      // ✅ NOUVEAU formulaire d'édition avec macros
                      <div style={{ background: '#f8f9ff', border: '2px solid #667eea', borderRadius: 12, padding: 14 }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                          <input type="text" value={editNom} onChange={(e) => setEditNom(e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#667eea'} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                            style={{ ...inputStyle, flex: 2, minWidth: 140 }} />
                          <input type="number" placeholder="kcal" value={editCalories} onChange={(e) => setEditCalories(e.target.value)}
                            onFocus={e => e.target.style.borderColor = '#667eea'} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                            style={{ ...inputStyle, width: 100 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                          {[
                            { emoji: '🥩', color: '#667eea', val: editProteines, set: setEditProteines, ph: t.protPlaceholder },
                            { emoji: '🌾', color: '#f093fb', val: editGlucides,  set: setEditGlucides,  ph: t.glucPlaceholder },
                            { emoji: '🫒', color: '#43e97b', val: editLipides,   set: setEditLipides,   ph: t.lipPlaceholder  },
                          ].map(({ emoji, color, val, set, ph }) => (
                            <div key={ph} style={{ flex: 1, minWidth: 90 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                                <span style={{ fontSize: 16 }}>{emoji}</span>
                              </div>
                              <input type="number" placeholder={ph} value={val} onChange={(e) => set(e.target.value)}
                                onFocus={e => e.target.style.borderColor = color} onBlur={e => e.target.style.borderColor = '#ede9f8'}
                                style={{ ...inputStyle, textAlign: 'center' }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={handleSaveEdit} style={{ ...btnPrimaryStyle, flex: 1, textAlign: 'center' }}>{t.savEdit}</button>
                          <button onClick={handleCancelEdit} style={{ ...btnPrimaryStyle, background: '#e0e0e0', color: '#666', boxShadow: 'none', flex: 1, textAlign: 'center' }}>{t.cancelEdit}</button>
                        </div>
                      </div>
                    ) : pendingDelete === meal.id ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff3f3', border: '2px solid #ffcdd2', borderRadius: 12, padding: '12px 15px' }}>
                        <span style={{ color: '#e53935', fontWeight: 500 }}>{t.deletingIn}</span>
                        <button onClick={handleCancelDelete} style={{ background: 'white', border: '2px solid #e0e0e0', color: '#666', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>{t.cancel}</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: '#f8f9ff', borderRadius: 12, border: '2px solid #f0f0f0', transition: 'all 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#667eea'; (e.currentTarget as HTMLDivElement).style.background = '#f0f3ff' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#f0f0f0'; (e.currentTarget as HTMLDivElement).style.background = '#f8f9ff' }}>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>{meal.nom}</span>
                          {(meal.proteines || meal.glucides || meal.lipides) && (
                            <div style={{ fontSize: '0.75em', color: '#aaa', marginTop: 2 }}>
                              {meal.proteines ? <span style={{ color: '#667eea', marginRight: 8 }}>🥩 {meal.proteines}g</span> : null}
                              {meal.glucides  ? <span style={{ color: '#f093fb', marginRight: 8 }}>🌾 {meal.glucides}g</span> : null}
                              {meal.lipides   ? <span style={{ color: '#43e97b' }}>🫒 {meal.lipides}g</span> : null}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#667eea', fontWeight: 'bold' }}>{meal.calories} kcal</span>
                          {/* ✅ NOUVEAU — bouton ✏️ dédié */}
                          <button onClick={() => handleEditClick(meal)}
                            style={{ background: '#f0f3ff', color: '#667eea', border: '2px solid #667eea', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: 'bold', fontSize: 14 }}>✏️</button>
                          <button onClick={() => handleDeleteClick(meal.id)}
                            style={{ background: '#7e57c2', color: 'white', border: 'none', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>✕</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react"
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  FlatList, Image, Dimensions, TextInput, Alert,
} from "react-native"
import { COLORS, FONTS, SPACING, RADIUS } from "../../constants/theme"
import { useStore } from "../../store/useStore"
import { storesAPI, categoriesAPI, sliderAPI } from "../../services/api"

const { width } = Dimensions.get("window")

// Mocks moved inside component or fetched from API

export default function HomeScreen({ navigation }: any) {
  const [bannerIndex, setBannerIndex] = useState(0)
  const [search, setSearch] = useState("")
  const [banners, setBanners] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const user = useStore((s) => s.user)
  const cartCount = useStore((s) => s.cartCount)()
  const unreadCount = useStore((s) => s.unreadCount)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bannersRes, categoriesRes, storesRes] = await Promise.all([
        sliderAPI.getBanners(),
        categoriesAPI.getAll(),
        storesAPI.getAll()
      ])
      setBanners(bannersRes.data.length > 0 ? bannersRes.data : [
        { id: "1", title: "Produits Frais\ndu Sénégal", subtitle: "Livraison en 30 min", bg: "#2E7D32", emoji: "🥬" },
        { id: "2", title: "Poisson Frais\ndu Jour", subtitle: "-20% sur les produits halieutiques", bg: "#00838F", emoji: "🐟" },
        { id: "3", title: "Commandez\net Gagnez", subtitle: "Des points de fidélité", bg: "#E65100", emoji: "🎁" },
      ])
      setCategories(categoriesRes.data)
      setStores(storesRes.data)
    } catch (e) {
      console.error("Home fetch error:", e)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour, {user?.name?.split(" ")[0] || "Bienvenue"} 👋</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.locationRow} onPress={() => Alert.alert("Localisation", "Fonctionnalité de changement d'adresse bientôt disponible")}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Dakar, Sénégal</Text>
            <Text style={styles.locationChevron}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={() => navigation.navigate("Notifications")}>
            <Text style={styles.iconBtnIcon}>🔔</Text>
            {unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.iconBtnIcon}>🛒</Text>
            {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher produits, marchés..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor={COLORS.gray}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.filterBtn} onPress={() => Alert.alert("Filtres", "La recherche avancée arrive bientôt")}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Banners */}
        <FlatList
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          onMomentumScrollEnd={(e) => setBannerIndex(Math.round(e.nativeEvent.contentOffset.x / (width - 32)))}
          contentContainerStyle={{ paddingHorizontal: SPACING.lg, gap: SPACING.md }}
          renderItem={({ item }) => (
            <View style={[styles.banner, { backgroundColor: item.bg || "#2E7D32", width: width - 32 }]}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.bannerBtn} onPress={() => navigation.navigate("Stores")}>
                  <Text style={styles.bannerBtnText}>Commander →</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.bannerEmoji}>{item.emoji}</Text>
            </View>
          )}
        />
        {/* Dots */}
        <View style={styles.dots}>
          {banners.map((_, i) => (
            <View key={i} style={[styles.dot, i === bannerIndex && styles.dotActive]} />
          ))}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Stores")}><Text style={styles.seeAll}>Voir tout</Text></TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => i.id || i._id}
            contentContainerStyle={{ paddingHorizontal: SPACING.lg, gap: SPACING.sm }}
            renderItem={({ item }) => (
              <TouchableOpacity 
                activeOpacity={0.7}
                style={[styles.categoryCard, { backgroundColor: item.color || "#F5F5F5" }]}
                onPress={() => Alert.alert("Catégorie", `Filtrer par ${item.name} bientôt disponible`)}
              >
                <Text style={styles.categoryEmoji}>{item.emoji || "📦"}</Text>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Nearby Stores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Marchés à proximité</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Stores")}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: SPACING.lg, gap: SPACING.md }}>
            {stores.map((store) => (
              <TouchableOpacity
                key={store.id || store._id}
                activeOpacity={0.9}
                style={styles.storeCard}
                onPress={() => navigation.navigate("StoreDetail", { store })}
              >
                <View style={styles.storeImagePlaceholder}>
                  <Text style={styles.storeEmoji}>{store.emoji || "🏪"}</Text>
                </View>
                <View style={styles.storeInfo}>
                  <View style={styles.storeNameRow}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    {store.tag && (
                      <View style={[styles.storeTag, store.tag === "Nouveau" ? { backgroundColor: "#E3F2FD" } : { backgroundColor: "#FFF8E1" }]}>
                        <Text style={[styles.storeTagText, store.tag === "Nouveau" ? { color: "#1565C0" } : { color: "#E65100" }]}>{store.tag}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.storeArea}>📍 {store.area || store.location}</Text>
                  <View style={styles.storeStats}>
                    <Text style={styles.storeRating}>⭐ {store.rating || 5.0}</Text>
                    <Text style={styles.storeSep}>·</Text>
                    <Text style={styles.storeDelivery}>🕐 {store.deliveryTime || "30 min"}</Text>
                    <Text style={styles.storeSep}>·</Text>
                    <Text style={styles.storeMin}>Min: {(store.minOrder || 0).toLocaleString()} FCFA</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: FONTS.sizes.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.5 },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
  locationIcon: { fontSize: 14 },
  locationText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, fontWeight: "500" },
  locationChevron: { color: COLORS.primary, fontSize: 10, marginLeft: 2 },
  headerActions: { flexDirection: "row", gap: SPACING.sm },
  iconBtn: {
    position: "relative",
    width: 44,
    height: 44,
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnIcon: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.round,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    zIndex: 2,
  },
  badgeText: { color: COLORS.white, fontSize: 9, fontWeight: "900" },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    gap: SPACING.sm,
    zIndex: 1,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  searchIcon: { fontSize: 16, opacity: 0.5 },
  searchInput: { flex: 1, fontSize: FONTS.sizes.md, color: COLORS.text, fontWeight: "500" },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  filterIcon: { fontSize: 24 },
  banner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    height: 170,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
    overflow: "hidden",
  },
  bannerContent: { flex: 1, zIndex: 1 },
  bannerTitle: { color: COLORS.white, fontSize: FONTS.sizes.xl, fontWeight: "900", lineHeight: 28, letterSpacing: -0.5 },
  bannerSubtitle: { color: "rgba(255,255,255,0.9)", fontSize: FONTS.sizes.sm, marginTop: 6, marginBottom: 16, fontWeight: "500" },
  bannerBtn: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: COLORS.black, fontSize: FONTS.sizes.sm, fontWeight: "700" },
  bannerEmoji: { fontSize: 80, position: "absolute", right: -10, bottom: -10, opacity: 0.3 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: SPACING.md },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.grayMedium },
  dotActive: { width: 24, backgroundColor: COLORS.primary },
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: FONTS.sizes.lg, fontWeight: "800", color: COLORS.text, letterSpacing: -0.5 },
  seeAll: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: "700" },
  categoryCard: {
    width: 85,
    height: 95,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryEmoji: { fontSize: 32 },
  categoryName: { fontSize: FONTS.sizes.xs, fontWeight: "700", color: COLORS.text, textAlign: "center" },
  storeCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  storeImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  storeEmoji: { fontSize: 40 },
  storeInfo: { flex: 1, justifyContent: "center", gap: 4 },
  storeNameRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  storeName: { flex: 1, fontSize: FONTS.sizes.md, fontWeight: "800", color: COLORS.text },
  storeTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.round },
  storeTagText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
  storeArea: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, fontWeight: "500" },
  storeStats: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  storeRating: { fontSize: 12, fontWeight: "700", color: COLORS.text },
  storeSep: { color: COLORS.gray, fontSize: 10 },
  storeDelivery: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "500" },
  storeMin: { fontSize: 12, color: COLORS.primary, fontWeight: "600" },
})

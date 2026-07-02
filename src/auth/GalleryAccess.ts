export interface GalleryAccessContext {
  isLoggedIn: boolean;
  accessibleEventIds?: ReadonlySet<string>;
}

interface GalleryLinkedEvent {
  id: string;
  galleryLink?: string | null;
}

export const canViewEventGallery = (
  event: GalleryLinkedEvent,
  access: GalleryAccessContext,
) => {
  if (!event.galleryLink || !access.isLoggedIn) return false;

  if (access.accessibleEventIds) {
    return access.accessibleEventIds.has(event.id);
  }

  return true;
};

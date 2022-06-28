
export enum Permission {
  /**
   * Default app permissions for public resources
   */
  AppDefault = '',

  /**
   * User permission
   */
  AppUser = 'app:user',

  /**
   * Admin permission for manages the users
   */
  AppAdmin = 'app:admin',

  /**
   * Blog permission to access to the blog system
   */
  AppBlog = 'app:blog',

  /**
   * Booking permissions to access to **EbbeMeister**
   */
  AppBooking = 'app:booking',

  /**
   * BookCase permission to access to **BookCase**
   */
  AppBookCase = 'app:bookcase',
}

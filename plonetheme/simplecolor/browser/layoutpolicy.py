from zope.interface import implements
from zope.component import getMultiAdapter
from zope.component import queryUtility
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.i18n.normalizer.interfaces import IIDNormalizer
from plone.app.layout.globals.interfaces import ILayoutPolicy
from plone.app.layout.globals.layout import LayoutPolicy
from plone.app.layout.navigation.root import getNavigationRootObject
from Products.CMFPlone.interfaces import IPloneSiteRoot
from Products.CMFPlone import utils


class LayoutPolicy(LayoutPolicy):
    """Override the body class method to show the nav roots
    """
    implements(ILayoutPolicy)

    def _findNavRoots(self, navroot, portal):
        """Find all the nav roots going up the tree
        """
        navroot_ids = []
        while True:
            if navroot.meta_type == 'Plone Site':
                break
            navroot_ids.append(navroot.getId())
            navroot = getNavigationRootObject(utils.parent(navroot), portal)
        navroot_ids.reverse()
        return navroot_ids

    def bodyClass(self, template, view):
        """Returns the CSS class to be used on the body tag.
        """
        context = self.context
        portal_state = getMultiAdapter(
            (context, self.request), name=u'plone_portal_state')

        # template class (required)
        name = ''
        if isinstance(template, ViewPageTemplateFile):
            # Browser view
            name = view.__name__
        else:
            name = template.getId()
        body_class = 'template-%s' % name

        # portal type class (optional)
        normalizer = queryUtility(IIDNormalizer)
        portal_type = normalizer.normalize(context.portal_type)
        if portal_type:
            body_class += " portaltype-%s" % portal_type

        # section class (optional)
        navroot = portal_state.navigation_root()
        navroot_len = len(navroot.getPhysicalPath())
        contentPath = context.getPhysicalPath()[navroot_len:]
        if contentPath:
            body_class += " section-%s" % contentPath[0]

        # Add each nav root to the body class
        navroot_ids = self._findNavRoots(navroot, portal_state.portal())
        if navroot_ids:
            body_class += " navroot-" + " navroot-".join(navroot_ids)

        # class for hiding icons (optional)
        if self.icons_visible():
            body_class += ' icons-on'

        return body_class

using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace EmployeeTimesheet.Helpers
{
    [HtmlTargetElement("li", Attributes = "active-menu-controller, active-menu-action")]
    public class ActiveMenuTagHelper : TagHelper
    {

        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext ViewContextData { get; set; }

        [HtmlAttributeName("active-menu-controller")]
        public string ActiveMenuController { get; set; }

        [HtmlAttributeName("active-menu-action")]
        public string ActiveMenuAction { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if(ViewContextData.RouteData.Values["controller"].ToString()==ActiveMenuController && ViewContextData.RouteData.Values["action"].ToString()==ActiveMenuAction)
            {
                output.Attributes.SetAttribute("class", "activeMenu");
            }
            else
            {
                output.Attributes.SetAttribute("class", "");
            }
        }

    }
}
